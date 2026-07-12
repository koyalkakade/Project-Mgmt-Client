import { useEffect, useState } from "react";
import { getUserInfo } from "../../api/api";
import ProfileCard from "./ProfileCard";
import ChangePasswordCard from "./ChangePasswordCard";
import EditProfileModal from "./EditProfileModal";

function Profile() {

    const [user,setUser]=useState({});
    const [showModal,setShowModal]=useState(false);

    async function fetchData(){
        const data=await getUserInfo();
        setUser(data.loggedUser);
    }

    useEffect(()=>{
        fetchData();
    },[]);

    return(

        <div className="container py-4">

            <div className="row g-4">

                <div className="col-lg-5">

                    <ProfileCard
                        user={user}
                        onEdit={()=>setShowModal(true)}
                    />

                </div>

                <div className="col-lg-7">

                    <ChangePasswordCard
                        user={user}
                    />

                </div>

            </div>

            <EditProfileModal
                show={showModal}
                user={user}
                onClose={()=>setShowModal(false)}
                refresh={fetchData}
            />

        </div>

    )

}

export default Profile;