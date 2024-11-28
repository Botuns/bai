"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
  Search,
  Home,
  Zap,
  HelpCircle,
  Mail,
  ShoppingBag,
  ChevronDown,
  User,
  Image as ImageIcon,
  Mic,
  MessageSquare,
  Star,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

// Simulated HP laptop data
const hpLaptops = [
  {
    summary: "HP Spectre x360 14",
    images: ["https://i.pcmag.com/imagery/reviews/043DROGFihmSgG7S6LUb006-1..v1709854231.jpg"],
    relevancePercentage: 95,
    externalLink: "https://example.com/hp-spectre-x360-14",
    price: 1299.99,
    ratings: 4.7,
    timing: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days from now
  },
  {
    summary: "HP Envy 13",
    images: ["https://i.pcmag.com/imagery/reviews/043DROGFihmSgG7S6LUb006-1..v1709854231.jpg"],
    relevancePercentage: 88,
    externalLink: "https://example.com/hp-envy-13",
    price: 899.99,
    ratings: 4.5,
    timing: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // 2 days from now
  },
  {
    summary: "HP Pavilion 15",
    images: ["https://i.pcmag.com/imagery/reviews/043DROGFihmSgG7S6LUb006-1..v1709854231.jpg"],
    relevancePercentage: 82,
    externalLink: "https://example.com/hp-pavilion-15",
    price: 649.99,
    ratings: 4.2,
    timing: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000), // 4 days from now
  },
  {
    summary: "HP EliteBook 840 G8",
    images: ["https://i.pcmag.com/imagery/reviews/043DROGFihmSgG7S6LUb006-1..v1709854231.jpg"],
    relevancePercentage: 90,
    externalLink: "https://example.com/hp-elitebook-840-g8",
    price: 1499.99,
    ratings: 4.8,
    timing: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000), // 1 day from now
  },
  {
    summary: "HP ProBook 450 G8",
    images: ["https://i.pcmag.com/imagery/reviews/043DROGFihmSgG7S6LUb006-1..v1709854231.jpg","https://i.pcmag.com/imagery/reviews/043DROGFihmSgG7S6LUb006-1..v1709854231.jpg"],
    relevancePercentage: 85,
    externalLink: "https://example.com/hp-probook-450-g8",
    price: 799.99,
    ratings: 4.4,
    timing: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000), // 5 days from now
  },
];

export function HeroAndNavbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState("");
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [searchResults, setSearchResults] = useState(hpLaptops);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSearch = async (searchQuery: string) => {
    if (!searchQuery.trim()) {
      toast({
        title: "Error",
        description: "Please enter a search query.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      // Simulate search by filtering the hpLaptops array
      const filteredResults = hpLaptops.filter((laptop) =>
        laptop.summary.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setSearchResults(filteredResults);
    } catch (error) {
      toast({
        title: "Error",
        description: "An error occurred while fetching search results.",
        variant: "destructive",
      });
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileUpload = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      console.log("File uploaded:", file.name);
    }
  };

  const handleProductClick = (product) => {
    setSelectedProduct(product);
  };

  const handleBuyNow = (product) => {
    console.log("Buying product:", product);
    toast({
      title: "Purchase Initiated",
      description: `You are purchasing ${product.summary}`,
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? "bg-white shadow-md" : "bg-transparent"
        }`}
      >
        <div className="container mx-auto px-4">
          <nav className="flex items-center justify-between py-4">
            <div className="flex items-center space-x-4">
              <a href="/" className="text-2xl font-bold text-blue-600">
                Bai
              </a>
              <NavigationMenu className="hidden md:block">
                <NavigationMenuList>
                  <NavigationMenuItem>
                    <NavigationMenuLink
                      className="flex items-center space-x-1 text-sm font-medium text-gray-700 hover:text-blue-600"
                      href="/"
                    >
                      <Home className="h-4 w-4" />
                      <span>Home</span>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <NavigationMenuLink
                      className="flex items-center space-x-1 text-sm font-medium text-gray-700 hover:text-blue-600"
                      href="/features"
                    >
                      <Zap className="h-4 w-4" />
                      <span>Features</span>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <NavigationMenuLink
                      className="flex items-center space-x-1 text-sm font-medium text-gray-700 hover:text-blue-600"
                      href="/how-it-works"
                    >
                      <HelpCircle className="h-4 w-4" />
                      <span>How it Works</span>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <NavigationMenuLink
                      className="flex items-center space-x-1 text-sm font-medium text-gray-700 hover:text-blue-600"
                      href="/contact"
                    >
                      <Mail className="h-4 w-4" />
                      <span>Contact Us</span>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <NavigationMenuTrigger className="flex items-center space-x-1 text-sm font-medium text-gray-700 hover:text-blue-600">
                      <ShoppingBag className="h-4 w-4" />
                      <span>Categories</span>
                      <ChevronDown className="h-3 w-3" />
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className="grid w-[200px] gap-3 p-4">
                        <li>
                          <NavigationMenuLink
                            className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-gray-100 focus:bg-gray-100"
                            href="#"
                          >
                            <div className="text-sm font-medium leading-none">
                              Electronics
                            </div>
                            <p className="line-clamp-2 text-sm leading-snug text-gray-500">
                              Find the best deals on gadgets and tech
                            </p>
                          </NavigationMenuLink>
                        </li>
                        <li>
                          <NavigationMenuLink
                            className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-gray-100 focus:bg-gray-100"
                            href="#"
                          >
                            <div className="text-sm font-medium leading-none">
                              Fashion
                            </div>
                            <p className="line-clamp-2 text-sm leading-snug text-gray-500">
                              Discover trendy clothes at great prices
                            </p>
                          </NavigationMenuLink>
                        </li>
                        <li>
                          <NavigationMenuLink
                            className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-gray-100 focus:bg-gray-100"
                            href="#"
                          >
                            <div className="text-sm font-medium leading-none">
                              Home & Garden
                            </div>
                            <p className="line-clamp-2 text-sm leading-snug text-gray-500">
                              Upgrade your living space for less
                            </p>
                          </NavigationMenuLink>
                        </li>
                      </ul>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
            </div>
            <div className="hidden md:flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                className="text-gray-700 hover:text-blue-600"
              >
                <User className="h-4 w-4 mr-2" />
                Login
              </Button>
              <Button
                size="sm"
                className="bg-blue-600 text-white hover:bg-blue-700"
              >
                Start Saving
              </Button>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            </Button>
          </nav>
        </div>
      </header>
      {isMenuOpen && (
        <div className="fixed inset-0 z-50 bg-white p-4 md:hidden">
          <div className="flex justify-end">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(false)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </Button>
          </div>
          <nav className="mt-8 space-y-4">
            <a
              href="/"
              className="block text-lg font-medium text-gray-700 hover:text-blue-600"
            >
              Home
            </a>
            <a
              href="/features"
              className="block text-lg font-medium text-gray-700 hover:text-blue-600"
            >
              Features
            </a>
            <a
              href="/how-it-works"
              className="block text-lg font-medium text-gray-700 hover:text-blue-600"
            >
              How it Works
            </a>
            <a
              href="/contact"
              className="block text-lg font-medium text-gray-700 hover:text-blue-600"
            >
              Contact Us
            </a>
            <a
              href="#"
              className="block text-lg font-medium text-gray-700 hover:text-blue-600"
            >
              Categories
            </a>
            <Button
              variant="ghost"
              size="sm"
              className="w-full justify-start text-gray-700 hover:text-blue-600"
            >
              <User className="h-4 w-4 mr-2" />
              Login
            </Button>
            <Button
              size="sm"
              className="w-full bg-blue-600 text-white hover:bg-blue-700"
            >
              Start Saving
            </Button>
          </nav>
        </div>
      )}
      <main className="pt-20">
        <section className="bg-gradient-to-b from-gray-50 to-white py-20 px-4">
          <div className="container mx-auto max-w-4xl text-center">
            <h1 className="mb-6 text-4xl font-bold leading-tight text-gray-900 sm:text-5xl md:text-6xl">
              Smart Shopping,{" "}
              <span className="text-blue-600">Tailored for You</span>
            </h1>
            <p className="mb-8 text-xl text-gray-600">
              Discover the best deals near you with AI-powered recommendations
            </p>
            <div className="relative mx-auto max-w-2xl mb-8">
              <Input
                type="text"
                placeholder="Find the Best Deals Near You"
                className="pl-10 pr-20 py-6 text-lg rounded-full shadow-lg"
                onChange={(event) => setQuery(event.target.value)}
              />
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Button
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-600 hover:bg-blue-700 text-white rounded-full px-6 py-2"
                onClick={() => handleSearch(query)}
              >
                {isLoading ? (
                  <small>Searching......</small>
                ) : (
                  <span>Search</span>
                )}
              </Button>
            </div>
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <Button
                variant="outline"
                size="sm"
                className="flex items-center space-x-2"
                onClick={handleFileUpload}
              >
                <ImageIcon className="h-4 w-4" />
                <span>Upload Image</span>
              </Button>
              <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                accept="image/*"
                onChange={handleFileChange}
              />
              <Button
                variant="outline"
                size="sm"
                className="flex items-center space-x-2"
              >
                <Mic className="h-4 w-4" />
                <span>Voice Search</span>
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="flex items-center space-x-2"
              >
                <MessageSquare className="h-4 w-4" />
                <span>Chat with AI</span>
              </Button>
            </div>
            <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-600">
              <span className="flex items-center">
                <Zap className="h-4 w-4 mr-1 text-teal-500" />
                Location-Based Results
              </span>
              <span className="flex items-center">
                <ShoppingBag className="h-4 w-4 mr-1 text-teal-500" />
                Budget-Aware Recommendations
              </span>
            </div>
          </div>
        </section>
        <section className="py-12 px-4">
          <div className="container mx-auto">
            <h2 className="text-2xl font-bold mb-6">Search Results</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {searchResults.map((product, index) => (
                <Card
                  key={index}
                  className="cursor-pointer hover:shadow-lg transition-shadow duration-300"
                  onClick={() => handleProductClick(product)}
                >
                  <CardHeader>
                    <CardTitle>{product.summary}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <img
                      src={product.images[0]}
                      alt={product.summary}
                      className="w-full h-48 object-cover mb-4 rounded-md"
                    />
                    <p className="text-2xl font-bold mb-2">
                      ${product.price.toFixed(2)}
                    </p>
                    <div className="flex items-center mb-2">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`h-5 w-5 ${
                            i < Math.round(product.ratings)
                              ? "text-yellow-400"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                      <span className="ml-2 text-sm text-gray-600">
                        ({product.ratings.toFixed(1)})
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">
                      Relevance: {product.relevancePercentage}%
                    </p>
                  </CardContent>
                  <CardFooter>
                    <p className="text-sm text-gray-600">
                      Ships by {product.timing.toLocaleDateString()}
                    </p>
                  </CardFooter>
                </Card>
              ))}
            </div>
            
          </div>
        </section>
      </main>
      <Dialog
        open={!!selectedProduct}
        onOpenChange={() => setSelectedProduct(null)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{selectedProduct?.summary}</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 items-center gap-4">
              <img
                src={selectedProduct?.images[0]}
                alt={selectedProduct?.summary}
                className="w-full h-48 object-cover rounded-md"
              />
              <div>
                <p className="text-2xl font-bold mb-2">
                  ${selectedProduct?.price.toFixed(2)}
                </p>
                <div className="flex items-center mb-2">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < Math.round(selectedProduct?.ratings || 0)
                          ? "text-yellow-400"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                  <span className="ml-2 text-sm text-gray-600">
                    ({selectedProduct?.ratings.toFixed(1)})
                  </span>
                </div>
                <p className="text-sm text-gray-600">
                  Relevance: {selectedProduct?.relevancePercentage}%
                </p>
                <p className="text-sm text-gray-600">
                  Ships by {selectedProduct?.timing.toLocaleDateString()}
                </p>
              </div>
            </div>
            <p className="text-sm text-gray-600">{selectedProduct?.summary}</p>
            <Button onClick={() => handleBuyNow(selectedProduct)}>
              Buy Now
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
