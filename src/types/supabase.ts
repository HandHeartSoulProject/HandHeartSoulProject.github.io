export type Json = string | number | boolean | null | { [key: string]: Json } | Json[];

export interface Database {
	public: {
		Tables: {
			community_event_types: {
				Row: {
					created_at: string | null;
					id: number;
					name: string;
				};
				Insert: {
					created_at?: string | null;
					id?: number;
					name: string;
				};
				Update: {
					created_at?: string | null;
					id?: number;
					name?: string;
				};
			};
			community_events: {
				Row: {
					created_at: string | null;
					date: string;
					description: string;
					id: number;
					location: string;
					name: string;
					num_adults: number;
					num_children: number;
					type: number;
				};
				Insert: {
					created_at?: string | null;
					date: string;
					description?: string;
					id?: number;
					location?: string;
					name: string;
					num_adults?: number;
					num_children?: number;
					type: number;
				};
				Update: {
					created_at?: string | null;
					date?: string;
					description?: string;
					id?: number;
					location?: string;
					name?: string;
					num_adults?: number;
					num_children?: number;
					type?: number;
				};
			};
			events: {
				Row: {
					created_at: string;
					date: string;
					id: number;
					name: string;
					num_served: number;
				};
				Insert: {
					created_at?: string;
					date: string;
					id?: number;
					name: string;
					num_served?: number;
				};
				Update: {
					created_at?: string;
					date?: string;
					id?: number;
					name?: string;
					num_served?: number;
				};
			};
		};
		Views: {
			[_ in never]: never;
		};
		Functions: {
			install_available_extensions_and_test: {
				Args: Record<PropertyKey, never>;
				Returns: boolean;
			};
		};
		Enums: {
			[_ in never]: never;
		};
	};
}
