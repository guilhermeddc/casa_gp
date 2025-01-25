import { firestore } from "@/shared/lib/firebase";
import { Image } from "@/shared/types";
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

const collectionName = "images";

class ImageService {
  async store({ profile_id, image }: Partial<Image>): Promise<string> {
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

    const payload: Partial<Image> = {
      profile_id,
      image: imageBase64,
    };

    const docRef = await addDoc(collection(firestore, collectionName), payload);

    return docRef.id;
  }

  async index(profile_id: string): Promise<Image[] | null> {
    const profileRef = collection(firestore, collectionName);
    const q = query(profileRef, where("profile_id", "==", profile_id));

    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      return null;
    } else {
      const docSnapshot = querySnapshot.docs[0];

      const images = querySnapshot.docs.map((doc) => {
        return {
          ...(doc.data() as Omit<Image, "id">),
          id: doc.id,
        } as Image;
      });

      return images;
    }
  }

  async destroy(id: string): Promise<void> {
    const docRef = doc(firestore, collectionName, id);

    await deleteDoc(docRef);
  }
}

export const imageService = new ImageService();
