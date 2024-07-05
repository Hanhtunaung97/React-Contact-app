import React, { useEffect, useState } from "react";
import { deleteContactData, getContactData } from "../service/contact.service";
import { ContactCardComponents, LoadingComponents } from "../components";
import ErrorComponents from "../components/Error.components";

const ContactPage = () => {
  const [items, setItems] = useState({
    loading: true,
    data: null,
    error: null,
  });
  const [deleteItem, setDeleteItem] = useState(false);
  useEffect(() => {
    (async () => {
      setItems((pre) => ({ ...pre, loading: true }));
      const res = await getContactData();
      // console.log(res);
      if (res) {
        setItems((pre) => ({ ...pre, loading: false, data: res }));
      } else {
        setItems((pre) => ({ ...pre, loading: false, error: res.msg }));
      }
    })();
  }, [deleteItem]);
  const deleteContact = async (id) => {
    console.log("delete id", id);
    const res = await deleteContactData(id);
    if (res) {
      setDeleteItem((pre) => !pre);
    }
  };
  return (
    <div className=" w-full h-full">
      {items.loading ? (
        <LoadingComponents />
      ) : (
        <div className="flex flex-col gap-y-5 w-full h-full justify-center items-center">
          {items.error ? (
            <ErrorComponents>{items.error}</ErrorComponents>
          ) : (
            items.data?.map((el) => (
              <ContactCardComponents
                deleteContact={deleteContact}
                key={el.id}
                data={el}
              />
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default ContactPage;
