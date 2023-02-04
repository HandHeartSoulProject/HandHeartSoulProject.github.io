export type Json = string | number | boolean | null | { [key: string]: Json } | Json[];

export interface Database {
	public: {
		Tables: {
			events: {
				Row: {
					createdAt: string | null;
					date: string;
					description: string | null;
					foodDescription: string | null;
					foodPounds: number | null;
					hours: number | null;
					id: number;
					location: string;
					name: string;
					numAdults: number | null;
					numChildren: number | null;
					presenter: string | null;
					type: number;
					virtual: boolean;
				};
				Insert: {
					createdAt?: string | null;
					date: string;
					description?: string | null;
					foodDescription?: string | null;
					foodPounds?: number | null;
					hours?: number | null;
					id?: number;
					location?: string;
					name: string;
					numAdults?: number | null;
					numChildren?: number | null;
					presenter?: string | null;
					type: number;
					virtual?: boolean;
				};
				Update: {
					createdAt?: string | null;
					date?: string;
					description?: string | null;
					foodDescription?: string | null;
					foodPounds?: number | null;
					hours?: number | null;
					id?: number;
					location?: string;
					name?: string;
					numAdults?: number | null;
					numChildren?: number | null;
					presenter?: string | null;
					type?: number;
					virtual?: boolean;
				};
			};
			eventTypes: {
				Row: {
					createdAt: string | null;
					id: number;
					name: string;
				};
				Insert: {
					createdAt?: string | null;
					id?: number;
					name: string;
				};
				Update: {
					createdAt?: string | null;
					id?: number;
					name?: string;
				};
			};
			presenters: {
				Row: {
					createdAt: string | null;
					id: number;
					name: string;
				};
				Insert: {
					createdAt?: string | null;
					id?: number;
					name: string;
				};
				Update: {
					createdAt?: string | null;
					id?: number;
					name?: string;
				};
			};
			tempEvents: {
				Row: {
					createdAt: string;
					date: string;
					id: number;
					name: string;
					numServed: number;
				};
				Insert: {
					createdAt?: string;
					date: string;
					id?: number;
					name: string;
					numServed?: number;
				};
				Update: {
					createdAt?: string;
					date?: string;
					id?: number;
					name?: string;
					numServed?: number;
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
