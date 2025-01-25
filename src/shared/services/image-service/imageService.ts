import { firestore } from "@/shared/lib/firebase";
import { Image, ImageFormValues } from "@/shared/types";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  where,
} from "firebase/firestore";

const collectionName = "images";

class ImageService {
  async store({ profile_id, images }: ImageFormValues): Promise<void> {
    if (!images || images.length === 0) {
      throw new Error("A imagem é obrigatória");
    }

    const processImage = async (imageFile: File): Promise<void> => {
      const imageBase64 = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          resolve(reader.result as string);
        };
        reader.onerror = (error) => {
          reject(error);
        };
        reader.readAsDataURL(imageFile);
      });

      const payload: Partial<Image> = {
        profile_id,
        image: imageBase64,
      };

      await addDoc(collection(firestore, collectionName), payload);
    };

    // Iterar sobre o array de imagens e criar as promessas
    const promises = images.map((item) => {
      const imageFile = item.image[0]; // Pega o primeiro arquivo do FileList
      if (imageFile) {
        return processImage(imageFile); // Cria uma promessa para processar e salvar
      }
      return Promise.resolve(); // Retorna uma promessa resolvida se não houver arquivo
    });

    // Espera todas as promessas serem concluídas
    await Promise.all(promises);
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
