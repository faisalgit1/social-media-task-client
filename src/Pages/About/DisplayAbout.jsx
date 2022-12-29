import React from 'react';


const DisplayAbout = ({ userInfo, usr }) => {

    console.log(usr)
    const { name, email, address, university } = userInfo

    const handleUser = event => {
        event.preventDefault();
        const form = event.target;
        const name = form.name.value;
        const email = form.email.value;
        const address = form.address.value;
        const university = form.university.value;


        const userUpdate = {
            name,
            email,
            address,
            university
        }

        fetch('https://social-media-task-server.vercel.app/updateUser', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(userUpdate)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.acknowledged) {
                    alert('User update successfully ')
                }


            })

    }

    return (
        <div>

            <div>

                <label htmlFor="my-modal-3" className="btn">Edit User Information </label>

                {/* Put this part before </body> tag */}
                <input type="checkbox" id="my-modal-3" className="modal-toggle" />
                <div className="modal">
                    <div className="modal-box relative">
                        <label htmlFor="my-modal-3" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                        <h3 className="text-lg font-bold">User Information </h3>

                        <form onSubmit={handleUser}>
                            <input name="name" type="text" defaultValue={name} className="input input-bordered w-full mb-5" />
                            <input name="email" type="text" defaultValue={email} className="input input-bordered w-full mb-5" />
                            <input name="address" type="text" defaultValue={address} className="input input-bordered w-full mb-5" />
                            <input name="university" type="text" defaultValue={university} className="input input-bordered w-full" />
                            <button type="submit" className="btn btn-accent input-bordered w-full" >
                                Update user </button>
                        </form>
                    </div>
                </div>
            </div>



            <div className="card w-96 mx-auto my-24 bg-neutral text-neutral-content">
                <h2>User Information </h2>

                <div className="card-body items-center text-center">
                    <h2 className="card-title">User name : {name}</h2>

                    <p className="card-title">User email : {email}</p>
                    <p>Address : {address}</p>
                    <p>University : {university}</p>
                </div>
            </div>
        </div>
    );
};

export default DisplayAbout;