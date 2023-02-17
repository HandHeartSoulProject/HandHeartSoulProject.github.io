import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import { Database } from "../types/supabase";

function Users() {
	async function getData() {
		var { data: events, error } = await supabase.from("auth.events").select("*");

		if (error || !events) console.error(error);
		
	}
    return (
        <button onClick={getData}>Click me</button>
    )
}

export default Users;