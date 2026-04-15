/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  BarChart3, 
  Plus, 
  Package, 
  Share2, 
  TrendingUp, 
  DollarSign, 
  ArrowUpRight,
  Copy,
  Check,
  X,
  Upload,
  ChevronRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// --- Components ---

const GumButton = ({ children, className = "", variant = "primary", ...props }: any) => {
  const bg = variant === "primary" ? "bg-gum-pink" : variant === "secondary" ? "bg-gum-yellow" : "bg-white";
  return (
    <button 
      className={`gum-border gum-shadow ${bg} px-6 py-3 font-black text-lg uppercase tracking-tight transition-all active:translate-x-[4px] active:translate-y-[4px] active:shadow-none disabled:opacity-50 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

const StatCard = ({ title, value, trend, color = "bg-white" }: any) => (
  <div className={`gum-card ${color} flex flex-col gap-1`}>
    <span className="text-[10px] font-black uppercase tracking-widest opacity-60">{title}</span>
    <div className="flex items-end justify-between">
      <span className="text-3xl font-black tabular-nums tracking-tighter">{value}</span>
      {trend && (
        <div className="flex items-center text-gum-green font-bold text-xs">
          <TrendingUp size={14} className="mr-1" />
          {trend}
        </div>
      )}
    </div>
  </div>
);

const ProductCard = ({ name, price, sales, image }: any) => (
  <div className="gum-card group relative overflow-hidden">
    <div className="aspect-square gum-border mb-3 bg-gum-yellow overflow-hidden">
      <img 
        src={image || `https://picsum.photos/seed/${name}/400/400`} 
        alt={name}
        className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-300"
        referrerPolicy="no-referrer"
      />
    </div>
    <div className="flex flex-col gap-1">
      <h3 className="font-black text-lg leading-tight truncate">{name}</h3>
      <div className="flex justify-between items-center">
        <span className="font-bold text-gum-green">${price}</span>
        <span className="text-xs font-bold opacity-60">{sales} sales</span>
      </div>
    </div>
    <button className="absolute top-2 right-2 gum-border bg-white p-1.5 gum-shadow-sm active:translate-x-[1px] active:translate-y-[1px] active:shadow-none">
      <Share2 size={16} />
    </button>
  </div>
);

// --- Screens ---

const Dashboard = () => (
  <div className="flex flex-col gap-6">
    <header className="flex flex-col gap-2">
      <h1 className="text-5xl font-black tracking-tighter uppercase italic leading-[0.8]">
        Gum<br/>Drop
      </h1>
      <p className="font-bold text-sm opacity-60">Welcome back, Creator.</p>
    </header>

    <div className="grid grid-cols-2 gap-4">
      <StatCard title="Total Earnings" value="$12,450" trend="+12%" color="bg-gum-pink" />
      <StatCard title="Active Products" value="24" />
      <StatCard title="Views" value="1.2k" trend="+5%" />
      <StatCard title="Conversion" value="4.2%" color="bg-gum-yellow" />
    </div>

    <section className="flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-black uppercase tracking-tight">Recent Sales</h2>
        <Button variant="link" className="font-bold text-gum-black p-0 h-auto">View All</Button>
      </div>
      <div className="flex flex-col gap-3">
        {[
          { name: "Digital Nomad Guide", price: 29, time: "2m ago" },
          { name: "UI Kit Pro", price: 99, time: "15m ago" },
          { name: "Icon Set v2", price: 15, time: "1h ago" },
        ].map((sale, i) => (
          <div key={i} className="gum-card flex items-center justify-between py-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 gum-border bg-gum-pink flex items-center justify-center">
                <DollarSign size={20} />
              </div>
              <div>
                <p className="font-black text-sm leading-tight">{sale.name}</p>
                <p className="text-[10px] font-bold opacity-50 uppercase tracking-wider">{sale.time}</p>
              </div>
            </div>
            <span className="font-black text-gum-green">+${sale.price}</span>
          </div>
        ))}
      </div>
    </section>
  </div>
);

const QuickSell = () => {
  const [step, setStep] = useState(1);
  return (
    <div className="flex flex-col gap-8 h-full">
      <header>
        <h2 className="text-4xl font-black uppercase tracking-tighter leading-none">Quick Sell</h2>
        <p className="font-bold opacity-60">Turn an idea into a product in seconds.</p>
      </header>

      <div className="flex-1 flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <label className="text-xs font-black uppercase tracking-widest">Product Name</label>
          <input 
            type="text" 
            placeholder="e.g. My Awesome Ebook"
            className="gum-border p-4 text-xl font-bold focus:outline-none focus:bg-gum-pink/10 transition-colors"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-xs font-black uppercase tracking-widest">Price (USD)</label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 font-black text-xl">$</span>
            <input 
              type="number" 
              placeholder="0.00"
              className="gum-border p-4 pl-10 text-xl font-bold w-full focus:outline-none focus:bg-gum-yellow/10 transition-colors"
            />
          </div>
        </div>

        <div className="flex flex-col gap-2 flex-1">
          <label className="text-xs font-black uppercase tracking-widest">Upload File</label>
          <div className="flex-1 gum-border border-dashed border-4 flex flex-col items-center justify-center gap-4 p-8 bg-white hover:bg-gum-pink/5 transition-colors cursor-pointer group">
            <div className="w-16 h-16 gum-border bg-white flex items-center justify-center gum-shadow group-hover:translate-x-[-2px] group-hover:translate-y-[-2px] group-hover:shadow-[6px_6px_0px_0px_#000000] transition-all">
              <Upload size={32} />
            </div>
            <p className="font-black text-center">Drop your file here or <span className="text-gum-pink underline">browse</span></p>
          </div>
        </div>
      </div>

      <GumButton className="w-full">Publish Product</GumButton>
    </div>
  );
};

const Products = () => (
  <div className="flex flex-col gap-6">
    <header className="flex justify-between items-end">
      <div>
        <h2 className="text-4xl font-black uppercase tracking-tighter leading-none">Products</h2>
        <p className="font-bold opacity-60">Manage your digital empire.</p>
      </div>
      <div className="gum-border bg-gum-pink p-2 gum-shadow-sm">
        <Plus size={24} />
      </div>
    </header>

    <div className="grid grid-cols-2 gap-4">
      {[
        { name: "Mastering React", price: 49, sales: 124 },
        { name: "Figma Templates", price: 19, sales: 850 },
        { name: "Icon Pack v1", price: 12, sales: 2100 },
        { name: "Gumdrop UI Kit", price: 0, sales: 45 },
        { name: "Creator Handbook", price: 25, sales: 312 },
        { name: "Newsletter Ads", price: 150, sales: 12 },
      ].map((p, i) => (
        <ProductCard key={i} {...p} />
      ))}
    </div>
  </div>
);

const Share = () => {
  const [copied, setCopied] = useState(false);
  const link = "gum.co/my-awesome-product";

  const handleCopy = () => {
    navigator.clipboard.writeText(link);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col gap-8">
      <header>
        <h2 className="text-4xl font-black uppercase tracking-tighter leading-none">Share</h2>
        <p className="font-bold opacity-60">Get your work in front of the world.</p>
      </header>

      <div className="gum-card bg-gum-yellow flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <label className="text-[10px] font-black uppercase tracking-widest opacity-60">Your Store Link</label>
          <div className="flex gap-2">
            <div className="flex-1 gum-border bg-white p-3 font-bold truncate">
              {link}
            </div>
            <button 
              onClick={handleCopy}
              className="gum-border bg-gum-pink p-3 gum-shadow-sm active:translate-x-[1px] active:translate-y-[1px] active:shadow-none"
            >
              {copied ? <Check size={20} /> : <Copy size={20} />}
            </button>
          </div>
        </div>
      </div>

      <section className="flex flex-col gap-4">
        <h3 className="text-xl font-black uppercase">Quick Share</h3>
        <div className="grid grid-cols-2 gap-4">
          {[
            { name: "Twitter", color: "bg-white" },
            { name: "Instagram", color: "bg-white" },
            { name: "Email", color: "bg-white" },
            { name: "WhatsApp", color: "bg-white" },
          ].map((platform, i) => (
            <button key={i} className={`gum-card ${platform.color} flex items-center justify-between group`}>
              <span className="font-black uppercase">{platform.name}</span>
              <ArrowUpRight size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </button>
          ))}
        </div>
      </section>

      <div className="gum-card bg-gum-pink flex items-center gap-4 p-6">
        <div className="w-16 h-16 gum-border bg-white flex items-center justify-center shrink-0">
          <Share2 size={32} />
        </div>
        <div>
          <h4 className="font-black text-lg leading-tight">Generate QR Code</h4>
          <p className="text-sm font-bold opacity-70">Perfect for physical products or events.</p>
        </div>
      </div>
    </div>
  );
};

// --- Main App ---

export default function App() {
  const [activeTab, setActiveTab] = useState("dashboard");

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard": return <Dashboard />;
      case "sell": return <QuickSell />;
      case "products": return <Products />;
      case "share": return <Share />;
      default: return <Dashboard />;
    }
  };

  return (
    <div className="max-w-md mx-auto min-h-screen bg-white flex flex-col shadow-2xl relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-gum-pink/20 blur-3xl -z-10" />
      <div className="absolute top-1/2 -left-20 w-64 h-64 rounded-full bg-gum-yellow/20 blur-3xl -z-10" />

      <main className="flex-1 p-6 pb-32">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            {renderContent()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white border-t-4 border-gum-black px-4 py-4 flex justify-between items-center z-50">
        {[
          { id: "dashboard", icon: BarChart3, label: "Stats" },
          { id: "products", icon: Package, label: "Items" },
          { id: "sell", icon: Plus, label: "Sell", center: true },
          { id: "share", icon: Share2, label: "Share" },
          { id: "settings", icon: ChevronRight, label: "More" },
        ].map((item) => {
          const isActive = activeTab === item.id;
          if (item.center) {
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`-mt-12 w-16 h-16 gum-border gum-shadow flex items-center justify-center transition-all ${isActive ? 'bg-gum-yellow translate-y-[-4px]' : 'bg-gum-pink'}`}
              >
                <item.icon size={32} strokeWidth={3} />
              </button>
            );
          }
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex flex-col items-center gap-1 transition-all ${isActive ? 'text-gum-pink scale-110' : 'opacity-40'}`}
            >
              <item.icon size={24} strokeWidth={isActive ? 3 : 2} />
              <span className="text-[10px] font-black uppercase tracking-widest">{item.label}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
}
