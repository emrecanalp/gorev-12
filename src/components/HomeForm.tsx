import { useEffect, useState } from "react";
import type { Home } from "../types/home";

const empty: Home = {
  title: "",
  description: "",
  pricePerNight: 0,
  location: "",
  imageUrl: "",
  guests: 1,
  bedrooms: 1,
  bathrooms: 1,
  amenities: [],
};

interface HomeFormProps {
  initial?: Home;
  onSubmit: (data: Home) => void;
  submittingLabel?: string;
}

export default function HomeForm({
  initial,
  onSubmit,
  submittingLabel = "Create Home",
}: HomeFormProps) {
  const [form, setForm] = useState<Home>(initial ?? empty);

  useEffect(() => {
    if (initial) setForm(initial);
  }, [initial]);

  const set = <K extends keyof Home>(key: K, value: Home[K]) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const payload: Home = {
      ...form,
      amenities: Array.isArray(form.amenities)
        ? form.amenities
        : String(form.amenities ?? "")
            .split(",")
            .map((s) => s.trim())
            .filter(Boolean),
    };
    onSubmit(payload);
  };

  return (
    <form 
    onSubmit={handleSubmit} 
    className="space-y-5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label className="label">Title *</label>
          <input
            className="input"
            value={form.title}
            onChange={(e) => set("title", e.target.value)}
            required
          />
        </div>
        <div>
          <label className="label">Location *</label>
          <input
            className="input"
            value={form.location}
            onChange={(e) => set("location", e.target.value)}
            required
          />
        </div>
      </div>

      <div>
        <label className="label">Description *</label>
        <textarea
          className="input min-h-[110px]"
          value={form.description}
          onChange={(e) => set("description", e.target.value)}
          required
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label className="label">Price per night ($) *</label>
          <input
            type="number"
            className="input"
            value={form.pricePerNight}
            onChange={(e) => set("pricePerNight", Number(e.target.value))}
            required
          />
        </div>
        <div>
          <label className="label">Image URL</label>
          <input
            className="input"
            value={form.imageUrl}
            onChange={(e) => set("imageUrl", e.target.value)}
            placeholder="https://example.com/image.jpg"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div>
          <label className="label">Guests *</label>
          <input
            type="number"
            className="input"
            value={form.guests}
            onChange={(e) => set("guests", Number(e.target.value))}
            required
          />
        </div>
        <div>
          <label className="label">Bedrooms *</label>
          <input
            type="number"
            className="input"
            value={form.bedrooms}
            onChange={(e) => set("bedrooms", Number(e.target.value))}
            required
          />
        </div>
        <div>
          <label className="label">Bathrooms *</label>
          <input
            type="number"
            className="input"
            value={form.bathrooms}
            onChange={(e) => set("bathrooms", Number(e.target.value))}
            required
          />
        </div>
      </div>

      <div>
        <label className="label">Amenities (comma-separated)</label>
        <input
          className="input"
          value={
            Array.isArray(form.amenities)
              ? form.amenities.join(", ")
              : String(form.amenities ?? "")
          }
          onChange={(e) => set("amenities", e.target.value as unknown as string[])}
          placeholder="WiFi, Kitchen, Air Conditioning, Pool"
        />
      </div>

      <div className="flex items-center gap-3 pt-2">
        <button type="submit" className="btn-primary">
          {submittingLabel}
        </button>
        <a href="/" className="btn-secondary">
          Cancel
        </a>
      </div>
    </form>
  );
}