// import React, { createContext, useContext, useEffect, useState } from "react";
// import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

// const ConfigContext = createContext();

// export const useConfig = () => useContext(ConfigContext);

// export const ConfigProvider = ({ children }) => {
//      const [config, setConfig] = useState({ api_url: "", api_key: "", api_host: "" });

//      useEffect(() => {
//           const fetchConfig = async () => {
//                const db = getFirestore();
//                const configRef = doc(db, "configurations", "api_settings");
//                const snapshot = await getDoc(configRef);
//                if (snapshot.exists()) setConfig(snapshot.data());
//           };
//           fetchConfig();
//      }, []);

//      const updateConfig = async (newConfig) => {
//           const db = getFirestore();
//           const configRef = doc(db, "configurations", "api_settings");
//           await setDoc(configRef, newConfig);
//           setConfig(newConfig);
//      };

//      return (
//           <ConfigContext.Provider value={{ config, updateConfig }}>
//                {children}
//           </ConfigContext.Provider>
//      );
// };

import React, { createContext, useContext, useEffect, useState } from "react";
import {
     getFirestore,
     collection,
     getDocs,
     updateDoc,
     setDoc,
     doc,
     query,
     where,
     addDoc,
     Timestamp,
} from "firebase/firestore";

const ConfigContext = createContext();
export const useConfig = () => useContext(ConfigContext);

export const ConfigProvider = ({ children }) => {
     const [apiKeys, setApiKeys] = useState([]);
     const [activeKey, setActiveKey] = useState(null);
     const db = getFirestore();

     // Fetch all keys
     const fetchApiKeys = async () => {
          const keysRef = collection(db, "api_config");
          const snapshot = await getDocs(keysRef);
          const keys = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
          setApiKeys(keys);

          const active = keys.find(k => k.status === "active");
          setActiveKey(active || null);
     };

     useEffect(() => {
          fetchApiKeys();
     }, []);

     // Add new API key (auto-disable previous active)
     const addApiKey = async (key, host) => {
          // Disable previous active key
          const currentActive = apiKeys.find(k => k.status === "active");
          if (currentActive) {
               await updateDoc(doc(db, "api_config", currentActive.id), {
                    status: "inactive",
                    updatedAt: Timestamp.now(),
               });
          }

          // Add new key
          await addDoc(collection(db, "api_config"), {
               key,
               host,
               count: 0,
               status: "active",
               createdAt: Timestamp.now(),
               updatedAt: Timestamp.now(),
          });

          await fetchApiKeys();
     };

     // Toggle key activation
     const toggleKeyStatus = async (id) => {
          const target = apiKeys.find(k => k.id === id);
          if (!target) return;

          if (target.status === "inactive") {
               // Deactivate currently active
               const active = apiKeys.find(k => k.status === "active");
               if (active) {
                    await updateDoc(doc(db, "api_config", active.id), { status: "inactive", updatedAt: Timestamp.now() });
               }
               await updateDoc(doc(db, "api_config", id), { status: "active", updatedAt: Timestamp.now() });
          } else {
               await updateDoc(doc(db, "api_config", id), { status: "inactive", updatedAt: Timestamp.now() });
          }

          await fetchApiKeys();
     };

     // Increment usage count
     const incrementKeyCount = async (id) => {
          const target = apiKeys.find(k => k.id === id);
          if (!target) return;

          await updateDoc(doc(db, "api_config", id), {
               count: (target.count || 0) + 1,
               updatedAt: Timestamp.now(),
          });

          await fetchApiKeys();
     };

     return (
          <ConfigContext.Provider
               value={{
                    apiKeys,
                    activeKey,
                    addApiKey,
                    toggleKeyStatus,
                    incrementKeyCount,
                    fetchApiKeys,
               }}
          >
               {children}
          </ConfigContext.Provider>
     );
};
