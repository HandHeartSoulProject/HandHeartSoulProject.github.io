import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import { Database } from "../types/supabase";

function Users() {
    type eventType = Database["public"]["Tables"]["events"]["Row"] & {
		type: { name: Database["public"]["Tables"]["eventTypes"]["Row"]["name"] };
	};
	const [events, setEvents] = useState<eventType[]>();

	useEffect(() => {
		fetchEvents();
	}, []);

	async function fetchEvents() {
		var { data: events, error } = await supabase.from("events").select("*, type (name)");

		if (error || !events) console.error(error);
		else setEvents(events as eventType[]);
	}

    async function createUser() {
        const { data, error } = await supabase.auth.signUp({
            email: 'example@email.com',
            password: 'example-password',
        })

    }

    return (
        <button onClick={createUser}>Create ex user</button>
    )
}

export default Users;