// src/hooks/useWizards.ts
import { useState, useEffect } from "react";
import { FirestoreService } from "@/services/firestoreService";
import { Wizard } from "@/types/types";


const wizardsService = new FirestoreService<Wizard>("wizards");

export const useWizards = () => {
  const [wizards, setWizards] = useState<Wizard[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWizards = async () => {
      setLoading(true);
      try {
        const data = await wizardsService.getAll();
        console.log('Pobrane wizardy:', data);
        setWizards(data);
      } catch (err) {
        console.error("Error fetching wizards:", err);
        setError("Failed to fetch wizards.");
      } finally {
        setLoading(false);
      }
    };

    fetchWizards();
  }, []);

  const addWizard = async (wizard: Wizard) => {
    console.log('Rozpoczynam dodawanie wizarda:', wizard);
    try {
      const id = await wizardsService.add(wizard);
      console.log('Otrzymano ID:', id);
      setWizards((prev) => [...prev, { ...wizard, id }]);
      console.log('Zaktualizowano stan wizardów');
      return id;
    } catch (err) {
      console.error("Error adding wizard:", err);
      setError("Failed to add wizard.");
      throw err;
    }
  };

  const deleteWizard = async (id: string) => {
    try {
      await wizardsService.delete(id);
      setWizards((prev) => prev.filter((wizard) => wizard.id !== id));
    } catch (err) {
      console.error("Error deleting wizard:", err);
      setError("Failed to delete wizard.");
    }
  };

  return { wizards, loading, error, addWizard, deleteWizard };
};