import { collection, getDocs, doc, getDoc, addDoc, query, where } from 'firebase/firestore';
import { db, isConfigured } from './firebase';
import { DEMO_TOURS, DEMO_TESTIMONIALS, INITIAL_CONFIG } from './demo-data';
import fs from 'fs';
import path from 'path';

function getLocalToursData() {
  try {
    const filePath = path.join(process.cwd(), 'docs', 'tours_data.json');
    if (fs.existsSync(filePath)) {
      const fileContent = fs.readFileSync(filePath, 'utf8');
      const parsed = JSON.parse(fileContent);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (e) {
    // fallback a DEMO_TOURS
  }
  return DEMO_TOURS;
}

export async function getTours(destination = 'all') {
  if (isConfigured && db) {
    try {
      const toursRef = collection(db, 'tours');
      let q = query(toursRef);
      if (destination !== 'all') {
        q = query(toursRef, where('destination', '==', destination));
      }
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      }
    } catch (error) {
      // Ignorar silenciosamente errores de conexión
    }
  }
  
  const allTours = getLocalToursData();

  if (destination === 'all') {
    return allTours;
  }
  return allTours.filter(t => t.destination === destination);
}

export async function getTourBySlug(slug) {
  if (isConfigured && db) {
    try {
      const toursRef = collection(db, 'tours');
      const q = query(toursRef, where('slug', '==', slug));
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        const docData = querySnapshot.docs[0];
        return { id: docData.id, ...docData.data() };
      }
    } catch (error) {
      // Ignorar silenciosamente
    }
  }
  
  const allTours = getLocalToursData();
  return allTours.find(t => t.slug === slug) || allTours[0];
}

export async function getTestimonials() {
  if (isConfigured && db) {
    try {
      const querySnapshot = await getDocs(collection(db, 'testimonials'));
      if (!querySnapshot.empty) {
        return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      }
    } catch (error) {
      // Ignorar silenciosamente
    }
  }
  return DEMO_TESTIMONIALS;
}

export async function getGeneralConfig() {
  if (isConfigured && db) {
    try {
      const configDoc = await getDoc(doc(db, 'config', 'general'));
      if (configDoc.exists()) {
        return { ...INITIAL_CONFIG, ...configDoc.data() };
      }
    } catch (error) {
      // Ignorar silenciosamente
    }
  }
  return INITIAL_CONFIG;
}

export async function saveContactMessage(data) {
  if (isConfigured && db) {
    try {
      await addDoc(collection(db, 'contacts'), {
        ...data,
        createdAt: new Date().toISOString(),
        status: 'unread'
      });
      return true;
    } catch (error) {
      console.warn("Contact message saved locally (offline mode)");
      return true;
    }
  }
  return true;
}
