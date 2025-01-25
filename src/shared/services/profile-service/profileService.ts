import { firestore } from "@/shared/lib/firebase";
import { Profile } from "@/shared/types";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  Timestamp,
  updateDoc,
  where,
} from "firebase/firestore";

const collectionName = "profiles";

class ProfileService {
  async store({
    name,
    age,
    description,
    height,
    feet,
    image,
    naturalness,
    slug,
    weight,
  }: Partial<Profile>): Promise<string> {
    if (!image || image.length === 0) {
      throw new Error("A imagem é obrigatória");
    }
    const imageFile = image[0] as any;

    const imageBase64 = await new Promise<string>((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        resolve(reader.result as string);
      };
      reader.readAsDataURL(imageFile);
    });

    const payload: Partial<Profile> = {
      createdAt: new Date().toDateString(),
      updatedAt: new Date().toDateString(),
      image: imageBase64,
      name,
      age,
      description,
      height,
      feet,
      naturalness,
      slug,
      weight,
    };

    const docRef = await addDoc(collection(firestore, collectionName), payload);

    return docRef.id;
  }

  async index(): Promise<Profile[]> {
    const profilesRef = collection(firestore, collectionName);

    const querySnapshot = await getDocs(profilesRef);

    const profiles = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return profiles as Profile[];
  }

  async show(id: string): Promise<Profile> {
    const docRef = doc(firestore, collectionName, id);
    const docSnapshot = await getDoc(docRef);

    return {
      id: docSnapshot.id,
      createdAt: undefined,
      updatedAt: undefined,
      ...(docSnapshot.data() as Omit<Profile, "id">),
    };
  }

  async showBySlug(slug: string): Promise<Profile | null> {
    const profileRef = collection(firestore, collectionName);
    const q = query(profileRef, where("slug", "==", slug));

    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      return null;
    } else {
      const docSnapshot = querySnapshot.docs[0];

      return {
        ...(docSnapshot.data() as Omit<Profile, "id">),
        id: docSnapshot.id,
        createdAt: undefined,
        updatedAt: undefined,
      } as Profile;
    }
  }

  async update(item: Partial<Profile>): Promise<void> {
    const { id, ...data } = item;
    const docRef = doc(firestore, collectionName, id!);

    await updateDoc(docRef, { ...data, updatedAt: new Date().toDateString() });
  }

  async destroy(id: string): Promise<void> {
    const docRef = doc(firestore, collectionName, id);

    await deleteDoc(docRef);
  }
}

export const profileService = new ProfileService();
