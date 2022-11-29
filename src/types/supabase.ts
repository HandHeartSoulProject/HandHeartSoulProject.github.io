export type Json = string | number | boolean | null | { [key: string]: Json } | Json[];

export interface Database {
	public: {
		Tables: {
			events: {
				Row: {
					id: number;
					created_at: string;
					name: string;
					date: string;
					location: Json | null;
					num_served: number;
				};
				Insert: {
					id?: number;
					created_at?: string;
					name: string;
					date: string;
					location?: Json | null;
					num_served?: number;
				};
				Update: {
					id?: number;
					created_at?: string;
					name?: string;
					date?: string;
					location?: Json | null;
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
