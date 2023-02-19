import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import { Database } from "../types/supabase";

function UsersTable() {
    type user = Database["public"]["Tables"]["users"]["Row"]
    const [users, setUsers] = useState<user[]>();

    useEffect(() => {
        fetchUsers();
    }, []);

    async function fetchUsers() {
        var { data: users, error } = await supabase.from("users").select("*");
        console.log(users);
        if (error || !users) console.error(error);
		else setUsers(users as user[]);
    }
   
    return (
        <div></div>
    )
}

export  default UsersTable;