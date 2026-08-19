import mysql from 'mysql2/promise';
import { DEMO_TOURS } from './demo-data';

// Reusar pool global para evitar overhead de handshake TCP en cada petición
if (!global._mysqlPool) {
  global._mysqlPool = mysql.createPool({
    host: process.env.MYSQL_HOST || 'gotravel_db',
    port: Number(process.env.MYSQL_PORT) || 3306,
    user: process.env.MYSQL_USER || 'gotravel_user',
    password: process.env.MYSQL_PASSWORD || 'GoTravelSecretPass2026!',
    database: process.env.MYSQL_DATABASE || 'gotravel_db',
    waitForConnections: true,
    connectionLimit: 20,
    queueLimit: 0,
    connectTimeout: 2000,
  });
}
const pool = global._mysqlPool;

let dbInitPromise = null;

export function initDB() {
  if (dbInitPromise) return dbInitPromise;

  dbInitPromise = (async () => {
    try {
      const createTableQuery = `
        CREATE TABLE IF NOT EXISTS tours (
          id VARCHAR(255) PRIMARY KEY,
          slug VARCHAR(255) UNIQUE NOT NULL,
          destination VARCHAR(100) NOT NULL,
          status VARCHAR(50) DEFAULT 'published',
          duration VARCHAR(100),
          max_capacity INT DEFAULT 12,
          price_adult DECIMAL(10,2) DEFAULT 0.00,
          price_child DECIMAL(10,2) DEFAULT 0.00,
          rating DECIMAL(3,2) DEFAULT 5.00,
          reviews_count INT DEFAULT 1,
          images JSON,
          title JSON,
          short_description JSON,
          full_description JSON,
          includes JSON,
          excludes JSON,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
      `;
      await pool.query(createTableQuery);

      const [rows] = await pool.query('SELECT COUNT(*) as count FROM tours');
      if (rows && rows[0] && rows[0].count === 0) {
        console.log('Seeding MySQL database with initial DEMO_TOURS...');
        for (const tour of DEMO_TOURS) {
          await insertSeedTour(tour);
        }
      }
    } catch (error) {
      console.warn('MySQL DB Connection / Init Warning:', error.message);
    }
  })();

  return dbInitPromise;
}

async function insertSeedTour(tour) {
  try {
    const query = `
      INSERT INTO tours (
        id, slug, destination, status, duration, max_capacity,
        price_adult, price_child, rating, reviews_count,
        images, title, short_description, full_description, includes, excludes
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      ON DUPLICATE KEY UPDATE id=id;
    `;
    const values = [
      tour.id,
      tour.slug || (tour.title?.es || 'tour').toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      tour.destination || 'cabos',
      tour.status || 'published',
      tour.duration || '4 horas',
      Number(tour.maxCapacity) || 12,
      Number(tour.priceAdult) || 1500,
      Number(tour.priceChild) || 950,
      Number(tour.rating) || 5.0,
      Number(tour.reviewsCount) || 1,
      JSON.stringify(tour.images || []),
      JSON.stringify(tour.title || {}),
      JSON.stringify(tour.shortDescription || {}),
      JSON.stringify(tour.fullDescription || {}),
      JSON.stringify(tour.includes || {}),
      JSON.stringify(tour.excludes || {}),
    ];
    await pool.query(query, values);
  } catch (e) {}
}

function parseJSON(val) {
  if (!val) return {};
  if (typeof val === 'object') return val;
  try {
    return JSON.parse(val);
  } catch (e) {
    return {};
  }
}

function mapRowToTour(row) {
  return {
    id: row.id,
    slug: row.slug,
    destination: row.destination,
    status: row.status,
    duration: row.duration,
    maxCapacity: Number(row.max_capacity),
    priceAdult: Number(row.price_adult),
    priceChild: Number(row.price_child),
    rating: Number(row.rating),
    reviewsCount: Number(row.reviews_count),
    images: parseJSON(row.images),
    title: parseJSON(row.title),
    shortDescription: parseJSON(row.short_description),
    fullDescription: parseJSON(row.full_description),
    includes: parseJSON(row.includes),
    excludes: parseJSON(row.excludes),
  };
}

export async function fetchToursFromDB(destination = 'all') {
  try {
    await initDB();
    let queryStr = 'SELECT * FROM tours';
    let params = [];
    if (destination !== 'all') {
      queryStr += ' WHERE destination = ?';
      params.push(destination);
    }
    queryStr += ' ORDER BY created_at DESC';

    const [rows] = await pool.query(queryStr, params);
    if (rows && rows.length > 0) {
      return rows.map(mapRowToTour);
    }
  } catch (error) {
    console.warn('Fetch from MySQL failed, using fallback:', error.message);
  }
  return DEMO_TOURS;
}

export async function fetchTourBySlugFromDB(slug) {
  try {
    await initDB();
    const [rows] = await pool.query('SELECT * FROM tours WHERE slug = ?', [slug]);
    if (rows && rows.length > 0) {
      return mapRowToTour(rows[0]);
    }
  } catch (error) {
    console.warn('Fetch tour by slug from MySQL failed:', error.message);
  }
  return DEMO_TOURS.find(t => t.slug === slug) || DEMO_TOURS[0];
}

export async function saveTourToDB(tour) {
  await initDB();
  try {
    const queryStr = `
      INSERT INTO tours (
        id, slug, destination, status, duration, max_capacity,
        price_adult, price_child, rating, reviews_count,
        images, title, short_description, full_description, includes, excludes
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      ON DUPLICATE KEY UPDATE
        slug = VALUES(slug),
        destination = VALUES(destination),
        status = VALUES(status),
        duration = VALUES(duration),
        max_capacity = VALUES(max_capacity),
        price_adult = VALUES(price_adult),
        price_child = VALUES(price_child),
        rating = VALUES(rating),
        reviews_count = VALUES(reviews_count),
        images = VALUES(images),
        title = VALUES(title),
        short_description = VALUES(short_description),
        full_description = VALUES(full_description),
        includes = VALUES(includes),
        excludes = VALUES(excludes);
    `;

    const values = [
      tour.id,
      tour.slug || (tour.title?.es || 'tour').toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      tour.destination || 'cabos',
      tour.status || 'published',
      tour.duration || '4 horas',
      Number(tour.maxCapacity) || 12,
      Number(tour.priceAdult) || 1500,
      Number(tour.priceChild) || 950,
      Number(tour.rating) || 5.0,
      Number(tour.reviewsCount) || 1,
      JSON.stringify(tour.images || []),
      JSON.stringify(tour.title || {}),
      JSON.stringify(tour.shortDescription || {}),
      JSON.stringify(tour.fullDescription || {}),
      JSON.stringify(tour.includes || {}),
      JSON.stringify(tour.excludes || {}),
    ];

    await pool.query(queryStr, values);
    return true;
  } catch (error) {
    console.error('Error saving tour to MySQL DB:', error);
    throw error;
  }
}

export async function deleteTourFromDB(tourId) {
  await initDB();
  try {
    await pool.query('DELETE FROM tours WHERE id = ?', [tourId]);
    return true;
  } catch (error) {
    console.error('Error deleting tour from MySQL DB:', error);
    throw error;
  }
}
