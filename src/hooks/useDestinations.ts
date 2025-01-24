import { useState, useEffect } from "react";
import { FirestoreService } from "@/services/firestoreService";

import { WithFieldValue } from "firebase/firestore";
import { Destination } from "@/types/destinations";

type DestinationCreate = Pick<Destination, 'name'>;

const destinationsService = new FirestoreService<Destination>("destinations");

export const useDestinations = () => {
  const [destinations, setDestinations] = useState<(Destination & { id: string })[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDestinations = async () => {
    setLoading(true);
    try {
      const data = await destinationsService.getAll();
      setDestinations(data);
    } catch {
      setError("Błąd podczas pobierania miejsc docelowych");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDestinations();
  }, []);

  const addDestination = async (destination: DestinationCreate) => {
    await destinationsService.add(destination as WithFieldValue<Destination>);
    fetchDestinations();
  };

  const updateDestination = async (destination: Destination) => {
    const { id, ...rest } = destination;
    try {
      await destinationsService.update(id, rest as WithFieldValue<Destination>);
      await fetchDestinations();
    } catch (err) {
      setError("Błąd podczas aktualizacji miejsca docelowego");
      throw err;
    }
  };

  const deleteDestination = async (id: string) => {
    await destinationsService.delete(id);
    fetchDestinations();
  };

  return { 
    destinations, 
    loading, 
    error, 
    addDestination, 
    updateDestination, 
    deleteDestination 
  };
};