import { Dialog, DialogContent} from "@/components/ui/dialog";
import SignupModal from "@/app/@modal/(.)auth/signup/SignupModal";

const Page = () => {
    return (
        <Dialog>
            <DialogContent>
                <SignupModal />
            </DialogContent>
        </Dialog>
    );
};

export default Page;
