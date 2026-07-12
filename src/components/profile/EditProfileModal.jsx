import { useEffect, useState } from "react";
import defaultAvatar from "../../assets/user-default.jpg";
import { updateProfileAPI } from "../../api/api";
import { toast } from "react-toastify";

function EditProfileModal({
    show,
    onClose,
    user,
 refresh
}) {

    const [formData, setForm] = useState({
        name: "",
        email: "",
        contactNumber: "",
        image: null
    });

    const [preview, setPreview] = useState("");

    const handleUpdate = async () => {
        try {

            const payload = new FormData();

            payload.append("name", formData.name);
            payload.append("email", formData.email);
            payload.append("contactNumber", formData.contactNumber);
            // console.log(formData.imgPath, 'image');
            if (formData.imgPath) {
                payload.append("imgPath", formData.imgPath);
            }

            // console.log(user._id, 'id')
            console.log([...payload.entries()]);
            //console.log([...formData.entries()]); // Check FormData contents

            const res = await updateProfileAPI(user._id, payload);

            toast.success(res.msg);

           await refresh();     // Fetch latest user data

            onClose();     // Close modal

        } catch (err) {

            toast.error(
                err.response?.data?.msg || "Update Failed"
            );

        }
    };

    useEffect(() => {

        setForm({

            name: user.name || "",
            email: user.email || "",
            contactNumber: user.contactNumber || "",

        });

        setPreview(user.imgPath || defaultAvatar);

    }, [user]);

    const handleImage = (e) => {

        const file = e.target.files[0];

        setForm({

            ...formData,
            imgPath: file

        });

        setPreview(URL.createObjectURL(file));

    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        setForm((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    if (!show) return null;

    return (

        <div
            className="modal fade show d-block"
            style={{
                background: "rgba(0,0,0,.5)"
            }}
        >

            <div className="modal-dialog modal-lg">

                <div className="modal-content rounded-4">

                    <div className="modal-header">

                        <h4>Edit Profile</h4>

                        <button
                            className="btn-close"
                            onClick={onClose}
                        />

                    </div>

                    <div className="modal-body">

                        <div className="text-center">

                            <img

                                src={preview}
                                className="rounded-circle mb-3"
                                style={{
                                    width: "130px",
                                    height: "130px",
                                    objectFit: "cover"
                                }}
                            />

                            <input
                                type="file"
                                className="form-control"
                                onChange={handleImage}
                            />

                        </div>

                        <div className="mt-4">

                            <label>Name</label>

                            <input
                                type="text"
                                className="form-control"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                            />

                        </div>

                        <div className="mt-3">

                            <label>Email</label>

                            <input
                                type="email"
                                className="form-control"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                            />

                        </div>

                        <div className="mt-3">

                            <label>Mobile</label>

                            <input
                                type="text"
                                className="form-control"
                                name="contactNumber"
                                value={formData.contactNumber}
                                onChange={handleInputChange}
                            />

                        </div>

                    </div>

                    <div className="modal-footer">

                        <button
                            className="btn btn-secondary"
                            onClick={onClose}
                        >

                            Cancel

                        </button>

                        <button
                            className="btn btn-primary"
                            onClick={handleUpdate}
                        >

                            Update Profile

                        </button>

                    </div>

                </div>

            </div>

        </div>

    )

}

export default EditProfileModal;