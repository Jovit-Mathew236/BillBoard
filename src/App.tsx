import "./App.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Display from "./modules/screen/pages/display";
import Admin from "./modules/admin/pages/admin";
import { useEffect, useState } from "react";
import { collection, onSnapshot, query } from "firebase/firestore";
import { db } from "./firebase/config";
import Display2 from "./modules/screen/pages/display2";

type ThemeData = {
  theme: number;
  layoutStyle: string;
};

function App() {
  const [themeData, setThemeData] = useState<ThemeData>();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userCollectionRef = collection(db, "theme");
        const q = query(userCollectionRef);

        const unsubscribe = onSnapshot(q, (querySnapshot) => {
          querySnapshot.docs.forEach((doc) => {
            setThemeData(doc.data() as ThemeData);
          });
        });

        return () => unsubscribe(); // Unsubscribe from the snapshot listener when component unmounts
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    if (themeData) {
      const root = document.documentElement;
      root.style.setProperty(
        "--bg-image",
        `url(../src/modules/screen/assets/${
          themeData.theme === 1 ? "bg.png" : "bg.webp"
        })`
      );
      root.style.setProperty(
        "--font-family",
        themeData.theme === 1 ? "ndot-47" : "CalSans-SemiBold"
      );
    }
  }, [themeData]);

  const router = createBrowserRouter([
    {
      path: "/",
      element: themeData?.theme === 1 ? <Display /> : <Display2 />,
    },
    {
      path: "/admin",
      element: <Admin />,
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
