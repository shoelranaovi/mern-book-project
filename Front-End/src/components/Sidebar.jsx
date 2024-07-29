import { Button, Modal, Sidebar, Spinner } from "flowbite-react";
import { useEffect, useState } from "react";
import {
  HiOutlineExclamationCircle,
  HiShoppingBag,
  HiTable,
  HiUser,
} from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { summaryApi } from "../common";
import { SigninSuccess } from "../redux/userSlice";

function Sideber() {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const { currentUser } = user;
  const [tab, setTab] = useState("");
  const [loading, setLoding] = useState(false);
  const [showmodel, setshowModel] = useState(false);
  console.log(showmodel);
  useEffect(() => {
    const urlPrams = new URLSearchParams(location.search);
    const tabparams = urlPrams.get("tab");
    if (tabparams) {
      setTab(tabparams);
    }
  }, [location.search]);

  async function signout() {
    console.log("hlw");
    setLoding(true);
    const response = await fetch(summaryApi.signout.url, {
      method: summaryApi.signout.method,
      credentials: "include",
    });
    const data = await response.json();
    console.log(data);
    toast.success(data.message);
    setLoding(false);
    setshowModel(false);
    navigate("/login");
    dispatch(SigninSuccess(null));
  }

  return (
    <Sidebar
      aria-label="Default sidebar "
      className=" w-[90vw]  mr-8 md:w-[300px] md:mr-0 md:h-[80vh] ">
      <Sidebar.Items className="mb-2">
        <Sidebar.ItemGroup>
          <Link to={"/Dashboard?tab=profile"}>
            <Sidebar.Item
              className="mb-2"
              active={tab === "profile"}
              href="#"
              icon={HiUser}
              label={currentUser.role}
              labelColor="dark">
              Profile
            </Sidebar.Item>
          </Link>
          {currentUser.role === "Admin" && (
            <div>
              <Link to={"/Dashboard?tab=alluser"}>
                <Sidebar.Item
                  active={tab === "alluser"}
                  className="mb-2"
                  icon={HiUser}>
                  All Users
                </Sidebar.Item>
              </Link>
              <Link to={"/Dashboard?tab=allbooks"}>
                <Sidebar.Item
                  active={tab === "allbooks"}
                  className="mb-2"
                  href="#"
                  icon={HiShoppingBag}>
                  All Books
                </Sidebar.Item>
              </Link>
            </div>
          )}
          <Sidebar.Item
            onClick={() => setshowModel(!showmodel)}
            as="div"
            icon={HiTable}>
            Sign out
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
      {showmodel && (
        <Modal
          show={showmodel}
          size="md"
          onClose={() => setshowModel(false)}
          popup>
          <Modal.Header />
          <Modal.Body>
            <div className="text-center">
              <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
              <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                Are you sure you want to delete this product?
              </h3>
              <div className="flex justify-center gap-4">
                <Button color="failure" onClick={signout}>
                  {loading && (
                    <Spinner
                      className=" ml-2"
                      aria-label="Spinner button example"
                      size="md"
                    />
                  )}{" "}
                  <p className="pl-4">{"Yes, I'm sure"}</p>
                </Button>
                <Button color="gray" onClick={() => setshowModel(false)}>
                  No, cancel
                </Button>
              </div>
            </div>
          </Modal.Body>
        </Modal>
      )}
    </Sidebar>
  );
}

export default Sideber;
