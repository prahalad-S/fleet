"use client";

import { useState } from "react";
import { Package, Search, Plus, AlertTriangle, ArrowDown, ArrowUp, Filter } from "lucide-react";

const inventory = [
  { id: "1", name: "Hydraulic Oil 10W", sku: "HYD-OIL-001", category: "Oil", stock: 250, minStock: 50, unit: "liters", price: 320, supplier: "Castrol India" },
  { id: "2", name: "Air Filter - CAT 320", sku: "FIL-AIR-012", category: "Filters", stock: 8, minStock: 10, unit: "pcs", price: 2800, supplier: "CAT Parts India" },
  { id: "3", name: "Bucket Teeth (Set of 5)", sku: "SPR-BTH-003", category: "Spare Parts", stock: 15, minStock: 5, unit: "sets", price: 12500, supplier: "JCB Parts" },
  { id: "4", name: "Track Chain Link", sku: "SPR-TCL-004", category: "Spare Parts", stock: 3, minStock: 5, unit: "pcs", price: 45000, supplier: "Komatsu Parts" },
  { id: "5", name: "Engine Oil 15W40", sku: "OIL-ENG-005", category: "Oil", stock: 500, minStock: 100, unit: "liters", price: 280, supplier: "Shell India" },
  { id: "6", name: "Safety Helmet", sku: "SAF-HLM-006", category: "Safety Equipment", stock: 42, minStock: 20, unit: "pcs", price: 450, supplier: "3M India" },
  { id: "7", name: "Hydraulic Hose 1/2\"", sku: "HYD-HSE-007", category: "Hydraulic Parts", stock: 12, minStock: 8, unit: "meters", price: 1200, supplier: "Parker Hannifin" },
  { id: "8", name: "Fuel Filter - JCB 3DX", sku: "FIL-FUL-008", category: "Filters", stock: 2, minStock: 10, unit: "pcs", price: 1800, supplier: "JCB Parts" },
  { id: "9", name: "Front Tyre 17.5-25", sku: "TYR-FRT-009", category: "Tyres", stock: 6, minStock: 4, unit: "pcs", price: 35000, supplier: "BKT Tyres" },
  { id: "10", name: "Grease Cartridge", sku: "GRS-CRT-010", category: "Grease", stock: 80, minStock: 30, unit: "pcs", price: 180, supplier: "Castrol India" },
];

const categories = ["All", "Oil", "Filters", "Spare Parts", "Hydraulic Parts", "Tyres", "Safety Equipment", "Grease", "Tools"];

export default function InventoryPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const lowStock = inventory.filter((i) => i.stock <= i.minStock).length;

  const filtered = inventory.filter((item) => {
    const matchSearch = item.name.toLowerCase().includes(search.toLowerCase()) || item.sku.toLowerCase().includes(search.toLowerCase());
    const matchCat = category === "All" || item.category === category;
    return matchSearch && matchCat;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-heading font-black text-dark">Inventory Management</h1>
          <p className="text-text-secondary text-sm mt-1">{inventory.length} items • {lowStock} low stock alerts</p>
        </div>
        <button className="btn-primary inline-flex"><Plus className="w-4 h-4" /> Add Item</button>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="card-premium p-4"><div className="flex items-center gap-3"><div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center"><Package className="w-5 h-5 text-blue-500" /></div><div><p className="text-xl font-heading font-bold text-dark">{inventory.length}</p><p className="text-xs text-text-muted">Total Items</p></div></div></div>
        <div className="card-premium p-4"><div className="flex items-center gap-3"><div className="w-10 h-10 rounded-xl bg-red-500/10 flex items-center justify-center"><AlertTriangle className="w-5 h-5 text-red-500" /></div><div><p className="text-xl font-heading font-bold text-red-500">{lowStock}</p><p className="text-xs text-text-muted">Low Stock</p></div></div></div>
        <div className="card-premium p-4"><div className="flex items-center gap-3"><div className="w-10 h-10 rounded-xl bg-green-500/10 flex items-center justify-center"><ArrowDown className="w-5 h-5 text-green-500" /></div><div><p className="text-xl font-heading font-bold text-dark">34</p><p className="text-xs text-text-muted">Received</p></div></div></div>
        <div className="card-premium p-4"><div className="flex items-center gap-3"><div className="w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center"><ArrowUp className="w-5 h-5 text-orange-500" /></div><div><p className="text-xl font-heading font-bold text-dark">18</p><p className="text-xs text-text-muted">Issued</p></div></div></div>
      </div>

      {/* Filters */}
      <div className="card-premium p-4 flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
          <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search by name or SKU..." className="w-full pl-10 pr-4 py-2.5 bg-background rounded-xl border border-border text-sm focus:border-primary outline-none transition-colors" />
        </div>
        <div className="flex gap-1 flex-wrap">
          {categories.map((cat) => (
            <button key={cat} onClick={() => setCategory(cat)} className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${category === cat ? "bg-primary text-dark" : "bg-background text-text-muted hover:text-dark border border-border"}`}>
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="card-premium overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead><tr className="bg-background">
              <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase">Item</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase">SKU</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase">Category</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase">Stock</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase">Unit Price</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase">Supplier</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase">Status</th>
            </tr></thead>
            <tbody className="divide-y divide-border">
              {filtered.map((item) => {
                const isLow = item.stock <= item.minStock;
                return (
                  <tr key={item.id} className="hover:bg-primary/3 transition-colors cursor-pointer">
                    <td className="px-4 py-3 font-bold text-dark">{item.name}</td>
                    <td className="px-4 py-3 text-text-muted font-mono text-xs">{item.sku}</td>
                    <td className="px-4 py-3"><span className="px-2 py-0.5 bg-primary/10 text-primary text-[10px] font-bold rounded-full">{item.category}</span></td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <span className={`font-bold ${isLow ? "text-red-500" : "text-dark"}`}>{item.stock}</span>
                        <span className="text-text-muted">/ {item.minStock} min</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-text-secondary">₹{item.price.toLocaleString()}/{item.unit}</td>
                    <td className="px-4 py-3 text-text-secondary">{item.supplier}</td>
                    <td className="px-4 py-3">
                      {isLow ? (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-red-500/10 text-red-600 text-[10px] font-bold uppercase">
                          <AlertTriangle className="w-3 h-3" /> Low Stock
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-green-500/10 text-green-600 text-[10px] font-bold uppercase">
                          In Stock
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
