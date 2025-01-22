import { useState, useEffect } from "react";
import { FirestoreService } from "@/services/firestoreService";
import { Category } from "@/types/types";

const categoriesService = new FirestoreService<Category>("categories");

export const useCategories = () => {
  const [categories, setCategories] = useState<(Category & { id: string })[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const data = await categoriesService.getAll();
      setCategories(data);
    } catch {
      setError("Błąd podczas pobierania kategorii");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const addCategory = async (cat: Category) => {
    const { parent_id, ...rest } = cat;
    const cleanedCategory = parent_id
      ? { ...rest, parent_id } // Jeśli `parent_id` istnieje, uwzględnij je
      : { ...rest }; // Usuń `parent_id`, jeśli jest `null`
  
    await categoriesService.add(cleanedCategory as Category);
    fetchCategories();
  };

  const updateCategory = async (cat: Category & { id: string }) => {
    const { id, parent_id, ...rest } = cat;
    const cleanedCategory = parent_id
      ? { ...rest, parent_id }
      : { ...rest };
    
    try {
      await categoriesService.update(id, cleanedCategory as Category);
      await fetchCategories();
    } catch (err) {
      setError("Błąd podczas aktualizacji kategorii");
      throw err;
    }
  };

  const deleteCategory = async (id: string) => {
    await categoriesService.delete(id);
    fetchCategories();
  };

  return { 
    categories, 
    loading, 
    error, 
    addCategory, 
    updateCategory, 
    deleteCategory 
  };
};