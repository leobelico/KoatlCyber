// *********************
// Role of the component: Wishlist item component for wishlist page
// Name of the component: WishItem.tsx
// Developer: Aleksandar Kuzmanovic
// Version: 1.1
// Component call: <WishItem id={id} title={title} price={price} image={image} slug={slug} stockAvailabillity={stockAvailabillity} />
// Input parameters: ProductInWishlist interface
// Output: single wishlist item on the wishlist page
// *********************

"use client";
import { useWishlistStore } from "@/app/_zustand/wishlistStore";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState, useCallback } from "react";
import toast from "react-hot-toast";
import { FaHeartCrack } from "react-icons/fa6";
import { useSession } from "next-auth/react";

interface ProductInWishlist {
  id: string;
  title: string;
  price: number;
  image: string;
  slug: string;
  stockAvailabillity: boolean | number; // Permite ambos tipos
}

const WishItem = ({
  id,
  title,
  price,
  image,
  slug,
  stockAvailabillity,
}: ProductInWishlist) => {
  
  const { data: session, status } = useSession();
  const { removeFromWishlist } = useWishlistStore();
  const router = useRouter();
  const [userId, setUserId] = useState<string>();

  const openProduct = (slug: string): void => {
    router.push(`/product/${slug}`);
  };

  const getUserByEmail = useCallback(async () => {
    if (session?.user?.email) {
      try {
        const response = await fetch(`http://localhost:3001/api/users/email/${session.user.email}`, {
          cache: "no-store",
        });
        const data = await response.json();
        setUserId(data?.id);
      } catch (error) {
        console.error("Error fetching user:", error);
        toast.error("Error loading user data");
      }
    }
  }, [session?.user?.email]); // Dependencies here

  const deleteItemFromWishlist = async (productId: string) => {
    if (userId) {
      try {
        const response = await fetch(`http://localhost:3001/api/wishlist/${userId}/${productId}`, {
          method: "DELETE"
        });
        
        if (response.ok) {
          removeFromWishlist(productId);
          toast.success("Item removed from your wishlist");
        } else {
          toast.error("Failed to remove item from wishlist");
        }
      } catch (error) {
        console.error("Error deleting wishlist item:", error);
        toast.error("Error removing item from wishlist");
      }
    } else {
      toast.error("You need to be logged in to perform this action");
    }
  };

  useEffect(() => {
    getUserByEmail();
  }, [getUserByEmail]); // Now includes all dependencies

  return (
    <tr className="hover:bg-gray-100 cursor-pointer">
      <th
        className="text-black text-sm text-center"
        onClick={() => openProduct(slug)}
      >
        {id}
      </th>
      <th>
        <div className="w-12 h-12 mx-auto" onClick={() => openProduct(slug)}>
          <Image
            src={`/${image}`}
            width={200}
            height={200}
            className="w-auto h-auto"
            alt={title}
          />
        </div>
      </th>
      <td
        className="text-black text-sm text-center"
        onClick={() => openProduct(slug)}
      >
        {title}
      </td>
      <td
        className="text-black text-sm text-center"
        onClick={() => openProduct(slug)}
      >
        {stockAvailabillity ? (
          <span className="text-success">In stock</span>
        ) : (
          <span className="text-error">Out of stock</span>
        )}
      </td>
      <td>
        <button 
          className="btn btn-xs bg-blue-500 text-white hover:text-blue-500 border border-blue-500 hover:bg-white hover:text-blue-500 text-sm"
          onClick={() => deleteItemFromWishlist(id)}
        >
          <FaHeartCrack />
          <span className="max-sm:hidden">
            remove from the wishlist
          </span>
        </button>
      </td>
    </tr>
  );
};

export default WishItem;