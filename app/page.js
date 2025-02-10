"use client"
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const navigateToCountries = () => {
    router.push("/countries");  
  };

  const navigateToBlog = () => {
    router.push("/blog");  
  };

  return (
    <div className="flex items-center justify-center h-screen gap-8">
        <button
          onClick={navigateToCountries}
          className="px-4 py-2 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600 transition"
        >
          Go to Countries page
        </button> 
        <button
          onClick={navigateToBlog}
          className="px-4 py-2 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600 transition"
        >
          Go to Blog page
        </button> 
    </div>
  );
}
