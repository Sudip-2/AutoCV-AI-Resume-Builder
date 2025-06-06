import { Loader2 } from "lucide-react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

export default function LoadingBtn({loading,disabled,className,...props}:any) {
    return(
        <Button
        disabled ={loading || disabled}
        className={cn("flex items-center gap-2",className)}
        {...props}
        >
            {loading && <Loader2 className="size-5 animate-spin"/>}
            {props.children}
        </Button>
    )
}