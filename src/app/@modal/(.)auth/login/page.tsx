import { Dialog, DialogContent} from "@/components/ui/dialog";
import LoginModal from "@/app/@modal/(.)auth/login/LoginModal";

const Page = () => {

    return (
        <Dialog>
            <DialogContent>
                <LoginModal />
            </DialogContent>
        </Dialog>
    );
};

export default Page;
