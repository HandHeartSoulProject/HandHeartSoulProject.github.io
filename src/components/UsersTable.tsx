import { useState } from "react";
import { supabase } from "../supabaseClient";
import { Database } from "../types/supabase";

function UsersTable() {
    type user = Database["public"]["Tables"]["users"]["Row"]
   
    return (
        <div></div>
    )
}

export  default UsersTable;