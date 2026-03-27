"use client";
import { useState, useEffect, useCallback } from "react";
import { IRestaurant, FilterParams } from "@/types";

interface UseRestaurantsResult {
  restaurants: IRestaurant[];
  loading: boolean;
  error: string | null;
  total: number;
  fetchRestaurants: (params?: FilterParams) => Promise<void>;
}

export function useRestaurants(initialParams?: FilterParams): UseRestaurantsResult {
  const [restaurants, setRestaurants] = useState<IRestaurant[]>([]);
  const [loading, setLoading]         = useState(true);
  const [error, setError]             = useState<string | null>(null);
  const [total, setTotal]             = useState(0);

  const fetchRestaurants = useCallback(async (params?: FilterParams) => {
    setLoading(true);
    setError(null);
    try {
      const query = new URLSearchParams();
      if (params?.search)     query.set("search",     params.search);
      if (params?.cuisine)    query.set("cuisine",    params.cuisine);
      if (params?.priceRange) query.set("priceRange", params.priceRange);
      if (params?.rating)     query.set("rating",     params.rating);
      if (params?.location)   query.set("location",   params.location);
      if (params?.isOpen)     query.set("isOpen",     params.isOpen);
      if (params?.sort)       query.set("sort",       params.sort);
      if (params?.page)       query.set("page",       String(params.page));
      if (params?.limit)      query.set("limit",      String(params.limit));

      const res  = await fetch(`/api/restaurants?${query.toString()}`);
      const data = await res.json();
      setRestaurants(data.restaurants || []);
      setTotal(data.total || data.restaurants?.length || 0);
    } catch {
      setError("Failed to load restaurants");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchRestaurants(initialParams);
  }, []);

  return { restaurants, loading, error, total, fetchRestaurants };
}