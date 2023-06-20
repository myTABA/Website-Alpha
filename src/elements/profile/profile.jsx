import {useUser} from "@clerk/clerk-react";

const Profile = () => {
    const {isLoaded, isSignedIn, user} = useUser();
    if (!isLoaded || !isSignedIn) {
        return null;
    }
    console.log(user);
    return <div>hi</div>
};

export default Profile;