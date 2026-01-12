// import React, { useState, useEffect } from "react";
// import { Typography, Input, Switch } from "@material-tailwind/react";
// import { collection, addDoc, getDocs, updateDoc, doc } from "firebase/firestore";
// import { db } from "@/firebase";

// const ApiConfigPage = () => {
//      const [keys, setKeys] = useState([]);
//      const [newKey, setNewKey] = useState({ api_key: "", api_host: "", });
//      const [loading, setLoading] = useState(false);

//      useEffect(() => {
//           fetchKeys();
//      }, []);

//      const fetchKeys = async () => {
//           const snapshot = await getDocs(collection(db, "api_config"));
//           const allKeys = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
//           setKeys(allKeys);
//      };

//      const handleAddKey = async (e) => {
//           e.preventDefault();
//           if (!newKey.api_key) return alert("All fields are required");
//           setLoading(true);

//           // Deactivate existing active keys
//           const activeKeys = keys.filter((k) => k.status === "active");
//           for (const key of activeKeys) {
//                await updateDoc(doc(db, "api_config", key.id), { status: "inactive" });
//           }

//           // Add new key with default count
//           await addDoc(collection(db, "api_config"), {
//                ...newKey,
//                count: 0,
//                status: "active",
//                created_at: new Date()
//           });

//           setNewKey({ api_key: "", api_host: "" });
//           await fetchKeys();
//           setLoading(false);
//      };

//      const toggleStatus = async (id, currentStatus) => {
//           if (currentStatus === "inactive") {
//                // Deactivate other keys first
//                const activeKeys = keys.filter((k) => k.status === "active");
//                for (const key of activeKeys) {
//                     await updateDoc(doc(db, "api_config", key.id), { status: "inactive" });
//                }
//           }
//           await updateDoc(doc(db, "api_config", id), {
//                status: currentStatus === "active" ? "inactive" : "active",
//           });
//           fetchKeys();
//      };

//      return (
//           <div className="p-6 space-y-6">
//                <Typography variant="h4">API Configuration</Typography>

//                {/* Add New Key Form */}
//                <form onSubmit={handleAddKey} className="space-y-4 max-w-md">
//                     <Input
//                          label="API Key"
//                          name="api_key"
//                          value={newKey.api_key}
//                          onChange={(e) => setNewKey((prev) => ({ ...prev, api_key: e.target.value }))}
//                     />
//                     <Input
//                          label="API Host"
//                          name="api_host"
//                          value={newKey.api_host}
//                          onChange={(e) => setNewKey((prev) => ({ ...prev, api_host: e.target.value }))}
//                     />
//                     <button
//                          type="submit"
//                          disabled={loading}
//                          className="bg-black text-white px-4 py-2 rounded hover:bg-opacity-90"
//                     >
//                          {loading ? "Saving..." : "Add New API Key"}
//                     </button>
//                </form>

//                {/* Keys Table */}
//                <div className="overflow-x-auto mt-8">
//                     <table className="min-w-full text-left text-sm border border-gray-300">
//                          <thead className="bg-gray-100">
//                               <tr>
//                                    <th className="p-2">Key</th>
//                                    <th className="p-2">Host</th>
//                                    <th className="p-2">Count</th>
//                                    <th className="p-2">Status</th>
//                                    <th className="p-2">Toggle</th>
//                               </tr>
//                          </thead>
//                          <tbody>
//                               {keys.map((key) => (
//                                    <tr key={key.id} className="border-t border-gray-300">
//                                         <td className="p-2">{key.api_key}</td>
//                                         <td className="p-2">{key.api_host}</td>
//                                         <td className="p-2">{key.count ?? 0}</td>
//                                         <td className="p-2 capitalize">{key.status}</td>
//                                         <td className="p-2">
//                                              <Switch
//                                                   checked={key.status === "active"}
//                                                   onChange={() => toggleStatus(key.id, key.status)}
//                                                   color="green"
//                                              />
//                                         </td>
//                                    </tr>
//                               ))}
//                          </tbody>
//                     </table>
//                </div>
//           </div>
//      );
// };

// export default ApiConfigPage;
// import React, { useState, useEffect } from "react";
// import { Typography, Input, Switch } from "@material-tailwind/react";
// import {
//      collection,
//      addDoc,
//      getDocs,
//      updateDoc,
//      doc,
// } from "firebase/firestore";
// import { db } from "@/firebase";

// const ApiConfigPage = () => {
//      const [keys, setKeys] = useState([]);
//      const [replicateKeys, setReplicateKeys] = useState([]);
//      const [newKey, setNewKey] = useState({ api_key: "", api_host: "" });
//      const [newReplicateKey, setNewReplicateKey] = useState({ api_key: "" });
//      const [loading, setLoading] = useState(false);
//      const [showReplicateView, setShowReplicateView] = useState(false);

//      useEffect(() => {
//           fetchKeys();
//      }, [showReplicateView]);

//      const fetchKeys = async () => {
//           const coll = showReplicateView ? "replicate_keys" : "api_config";
//           const snapshot = await getDocs(collection(db, coll));
//           const allKeys = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
//           if (showReplicateView) {
//                setReplicateKeys(allKeys);
//           } else {
//                setKeys(allKeys);
//           }
//      };

//      const handleAddKey = async (e) => {
//           e.preventDefault();
//           setLoading(true);

//           const targetCollection = showReplicateView ? "replicate_keys" : "api_config";
//           const keyToAdd = showReplicateView
//                ? newReplicateKey
//                : newKey;

//           if (!keyToAdd.api_key || (!showReplicateView && !keyToAdd.api_host)) {
//                setLoading(false);
//                return alert("All fields are required.");
//           }

//           // Deactivate existing active keys
//           const activeKeys = (showReplicateView ? replicateKeys : keys).filter((k) => k.status === "active");
//           for (const key of activeKeys) {
//                await updateDoc(doc(db, targetCollection, key.id), { status: "inactive" });
//           }

//           await addDoc(collection(db, targetCollection), {
//                ...keyToAdd,
//                count: 0,
//                status: "active",
//                created_at: new Date(),
//           });

//           if (showReplicateView) {
//                setNewReplicateKey({ api_key: "" });
//           } else {
//                setNewKey({ api_key: "", api_host: "" });
//           }

//           await fetchKeys();
//           setLoading(false);
//      };

//      const toggleStatus = async (id, currentStatus) => {
//           const coll = showReplicateView ? "replicate_keys" : "api_config";
//           const keySet = showReplicateView ? replicateKeys : keys;

//           if (currentStatus === "inactive") {
//                const activeKeys = keySet.filter((k) => k.status === "active");
//                for (const key of activeKeys) {
//                     await updateDoc(doc(db, coll, key.id), { status: "inactive" });
//                }
//           }

//           await updateDoc(doc(db, coll, id), {
//                status: currentStatus === "active" ? "inactive" : "active",
//           });

//           fetchKeys();
//      };

//      return (
//           <div className="p-6 space-y-6">
//                <div className="flex items-center justify-between">
//                     <Typography variant="h4">
//                          {showReplicateView ? "Image To Image API Keys" : "API Configuration"}
//                     </Typography>
//                     <Switch
//                          label="Replicate View"
//                          checked={showReplicateView}
//                          onChange={() => {
//                               setShowReplicateView(!showReplicateView);
//                          }}
//                          color="blue"
//                     />
//                </div>

//                {/* Add New Key Form */}
//                <form onSubmit={handleAddKey} className="space-y-4 max-w-md">
//                     <Input
//                          label="API Key"
//                          name="api_key"
//                          value={
//                               showReplicateView ? newReplicateKey.api_key : newKey.api_key
//                          }
//                          onChange={(e) =>
//                               showReplicateView
//                                    ? setNewReplicateKey((prev) => ({ ...prev, api_key: e.target.value }))
//                                    : setNewKey((prev) => ({ ...prev, api_key: e.target.value }))
//                          }
//                     />
//                     {!showReplicateView && (
//                          <Input
//                               label="API Host"
//                               name="api_host"
//                               value={newKey.api_host}
//                               onChange={(e) =>
//                                    setNewKey((prev) => ({ ...prev, api_host: e.target.value }))
//                               }
//                          />
//                     )}
//                     <button
//                          type="submit"
//                          disabled={loading}
//                          className="bg-black text-white px-4 py-2 rounded hover:bg-opacity-90"
//                     >
//                          {loading ? "Saving..." : "Add API Key"}
//                     </button>
//                </form>

//                {/* Keys Table */}
//                <div className="overflow-x-auto mt-8">
//                     <table className="min-w-full text-left text-sm border border-gray-300">
//                          <thead className="bg-gray-100">
//                               <tr>
//                                    <th className="p-2">Key</th>
//                                    {!showReplicateView && <th className="p-2">Host</th>}
//                                    <th className="p-2">Count</th>
//                                    <th className="p-2">Status</th>
//                                    <th className="p-2">Toggle</th>
//                               </tr>
//                          </thead>
//                          <tbody>
//                               {(showReplicateView ? replicateKeys : keys).map((key) => (
//                                    <tr key={key.id} className="border-t border-gray-300">
//                                         <td className="p-2">{key.api_key}</td>
//                                         {!showReplicateView && <td className="p-2">{key.api_host}</td>}
//                                         <td className="p-2">{key.count ?? 0}</td>
//                                         <td className="p-2 capitalize">{key.status}</td>
//                                         <td className="p-2">
//                                              <Switch
//                                                   checked={key.status === "active"}
//                                                   onChange={() => toggleStatus(key.id, key.status)}
//                                                   color="green"
//                                              />
//                                         </td>
//                                    </tr>
//                               ))}
//                          </tbody>
//                     </table>
//                </div>
//           </div>
//      );
// };

// export default ApiConfigPage;



import React, { useState, useEffect } from "react";
import { Typography, Input, Switch } from "@material-tailwind/react";
import {
     collection,
     addDoc,
     getDocs,
     updateDoc,
     doc,
} from "firebase/firestore";
import { db } from "@/firebase";

const ApiConfigPage = () => {
     const [keys, setKeys] = useState([]);
     const [replicateKeys, setReplicateKeys] = useState([]);
     const [newKey, setNewKey] = useState({ api_key: "", api_host: "" });
     const [newReplicateKey, setNewReplicateKey] = useState({ api_key: "" });
     const [loading, setLoading] = useState(false);
     const [showReplicateView, setShowReplicateView] = useState(false);
     const [editIndex, setEditIndex] = useState(null);
     const [editApiKey, setEditApiKey] = useState("");

     useEffect(() => {
          fetchKeys();
     }, [showReplicateView]);

     const fetchKeys = async () => {
          const coll = showReplicateView ? "replicate_keys" : "api_config";
          const snapshot = await getDocs(collection(db, coll));
          const allKeys = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
          if (showReplicateView) {
               setReplicateKeys(allKeys);
          } else {
               setKeys(allKeys);
          }
     };

     const handleAddKey = async (e) => {
          e.preventDefault();
          setLoading(true);

          const targetCollection = showReplicateView ? "replicate_keys" : "api_config";
          const keyToAdd = showReplicateView ? newReplicateKey : newKey;

          if (!keyToAdd.api_key || (!showReplicateView && !keyToAdd.api_host)) {
               setLoading(false);
               return alert("All fields are required.");
          }

          const activeKeys = (showReplicateView ? replicateKeys : keys).filter((k) => k.status === "active");
          for (const key of activeKeys) {
               await updateDoc(doc(db, targetCollection, key.id), { status: "inactive" });
          }

          await addDoc(collection(db, targetCollection), {
               ...keyToAdd,
               count: 0,
               status: "active",
               created_at: new Date(),
          });

          if (showReplicateView) {
               setNewReplicateKey({ api_key: "" });
          } else {
               setNewKey({ api_key: "", api_host: "" });
          }

          await fetchKeys();
          setLoading(false);
     };

     const toggleStatus = async (id, currentStatus) => {
          const coll = "api_config";

          if (currentStatus === "inactive") {
               const activeKeys = keys.filter((k) => k.status === "active");
               for (const key of activeKeys) {
                    await updateDoc(doc(db, coll, key.id), { status: "inactive" });
               }
          }

          await updateDoc(doc(db, coll, id), {
               status: currentStatus === "active" ? "inactive" : "active",
          });

          fetchKeys();
     };

     const handleEditClick = (index, key) => {
          setEditIndex(index);
          setEditApiKey(key.api_key);
     };

     const handleSaveEdit = async (id) => {
          await updateDoc(doc(db, "replicate_keys", id), { api_key: editApiKey });
          setEditIndex(null);
          setEditApiKey("");
          fetchKeys();
     };

     return (
          <div className="p-6 space-y-6">
               <div className="flex items-center justify-between">
                    <Typography variant="h4">
                         {showReplicateView ? "Image to Image API key" : "Text to Image API key"}
                    </Typography>
                    <Switch
                         label="Switch"
                         checked={showReplicateView}
                         onChange={() => {
                              setShowReplicateView(!showReplicateView);
                              setEditIndex(null);
                         }}
                         color="blue"
                    />
               </div>
               <form onSubmit={handleAddKey} className="space-y-4 max-w-md">
                    <Input
                         label="API Key"
                         name="api_key"
                         value={showReplicateView ? newReplicateKey.api_key : newKey.api_key}
                         onChange={(e) =>
                              showReplicateView
                                   ? setNewReplicateKey((prev) => ({ ...prev, api_key: e.target.value }))
                                   : setNewKey((prev) => ({ ...prev, api_key: e.target.value }))
                         }
                         disabled={
                              showReplicateView &&
                              replicateKeys.length > 0 &&
                              replicateKeys[0]?.created_at
                         }
                    />
                    {!showReplicateView && (
                         <Input
                              label="API Host"
                              name="api_host"
                              value={newKey.api_host}
                              onChange={(e) =>
                                   setNewKey((prev) => ({ ...prev, api_host: e.target.value }))
                              }
                         />
                    )}
                    <button
                         type="submit"
                         disabled={
                              loading ||
                              (showReplicateView &&
                                   replicateKeys.length > 0 &&
                                   replicateKeys[0]?.created_at)
                         }
                         className={`px-4 py-2 rounded text-white ${loading ||
                              (showReplicateView &&
                                   replicateKeys.length > 0 &&
                                   replicateKeys[0]?.created_at)
                              ? "bg-gray-400 cursor-not-allowed"
                              : "bg-black hover:bg-opacity-90"
                              }`}
                    >
                         {loading ? "Saving..." : "Add API Key"}
                    </button>
               </form>

               <div className="overflow-x-auto mt-8">
                    <table className="min-w-full text-left text-sm border border-gray-300">
                         <thead className="bg-gray-100">
                              <tr>
                                   <th className="p-2">Key</th>
                                   {!showReplicateView && <th className="p-2">Host</th>}
                                   {!showReplicateView && <th className="p-2">Count</th>}
                                   <th className="p-2">Status</th>
                                   <th className="p-2">{showReplicateView ? "Action" : "Toggle"}</th>
                              </tr>
                         </thead>
                         <tbody>
                              {(showReplicateView ? replicateKeys : keys).map((key, index) => (
                                   <tr key={key.id} className="border-t border-gray-300">
                                        <td className="p-2">
                                             {showReplicateView && editIndex === index ? (
                                                  <Input
                                                       value={editApiKey}
                                                       onChange={(e) => setEditApiKey(e.target.value)}
                                                       className="w-full"
                                                  />
                                             ) : (
                                                  key.api_key
                                             )}
                                        </td>
                                        {!showReplicateView && <td className="p-2">{key.api_host}</td>}
                                        {!showReplicateView && <td className="p-2">{key.count ?? 0}</td>}
                                        <td className="p-2 capitalize">{key.status}</td>
                                        <td className="p-2">
                                             {showReplicateView ? (
                                                  editIndex === index ? (
                                                       <button
                                                            className="text-blue-600"
                                                            onClick={() => handleSaveEdit(key.id)}
                                                       >
                                                            Save
                                                       </button>
                                                  ) : (
                                                       <button
                                                            className="text-blue-600"
                                                            onClick={() => handleEditClick(index, key)}
                                                       >
                                                            Edit
                                                       </button>
                                                  )
                                             ) : (
                                                  <Switch
                                                       checked={key.status === "active"}
                                                       onChange={() => toggleStatus(key.id, key.status)}
                                                       color="green"
                                                  />
                                             )}
                                        </td>
                                   </tr>
                              ))}
                         </tbody>
                    </table>
               </div>
          </div>
     );
};

export default ApiConfigPage;
