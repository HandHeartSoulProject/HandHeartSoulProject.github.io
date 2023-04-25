export type Json = string | number | boolean | null | { [key: string]: Json } | Json[];

export interface Database {
	public: {
		Tables: {
			childrenEvents: {
				Row: {
					createdAt: string;
					createdBy: string | null;
					date: string;
					description: string | null;
					endTime: string;
					id: number;
					name: string;
					numAdults: number;
					numChildren: number;
					site: number | null;
					startTime: string;
					type: number | null;
				};
				Insert: {
					createdAt?: string;
					createdBy?: string | null;
					date: string;
					description?: string | null;
					endTime: string;
					id?: number;
					name: string;
					numAdults: number;
					numChildren: number;
					site?: number | null;
					startTime: string;
					type?: number | null;
				};
				Update: {
					createdAt?: string;
					createdBy?: string | null;
					date?: string;
					description?: string | null;
					endTime?: string;
					id?: number;
					name?: string;
					numAdults?: number;
					numChildren?: number;
					site?: number | null;
					startTime?: string;
					type?: number | null;
				};
			};
			childrenEventTypes: {
				Row: {
					id: number;
					name: string | null;
				};
				Insert: {
					id?: number;
					name?: string | null;
				};
				Update: {
					id?: number;
					name?: string | null;
				};
			};
			communityEvents: {
				Row: {
					createdAt: string | null;
					createdBy: string | null;
					date: string;
					description: string | null;
					foodDescription: string | null;
					foodPounds: number | null;
					hours: number | null;
					id: number;
					location: string | null;
					name: string;
					numAdults: number | null;
					numChildren: number | null;
					presenter: string | null;
					type: number;
					virtual: boolean;
				};
				Insert: {
					createdAt?: string | null;
					createdBy?: string | null;
					date: string;
					description?: string | null;
					foodDescription?: string | null;
					foodPounds?: number | null;
					hours?: number | null;
					id?: number;
					location?: string | null;
					name: string;
					numAdults?: number | null;
					numChildren?: number | null;
					presenter?: string | null;
					type: number;
					virtual?: boolean;
				};
				Update: {
					createdAt?: string | null;
					createdBy?: string | null;
					date?: string;
					description?: string | null;
					foodDescription?: string | null;
					foodPounds?: number | null;
					hours?: number | null;
					id?: number;
					location?: string | null;
					name?: string;
					numAdults?: number | null;
					numChildren?: number | null;
					presenter?: string | null;
					type?: number;
					virtual?: boolean;
				};
			};
			communityEventTypes: {
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
			sites: {
				Row: {
					id: number;
					name: string | null;
				};
				Insert: {
					id?: number;
					name?: string | null;
				};
				Update: {
					id?: number;
					name?: string | null;
				};
			};
			users: {
				Row: {
					email: string;
					id: string;
					role: string;
				};
				Insert: {
					email: string;
					id: string;
					role: string;
				};
				Update: {
					email?: string;
					id?: string;
					role?: string;
				};
			};
		};
		Views: {
			[_ in never]: never;
		};
		Functions: {
			aggregate_children_events: {
				Args: Record<PropertyKey, never>;
				Returns: {
					year: number;
					month: number;
					totaladults: number;
					totalchildren: number;
				}[];
			};
			aggregate_children_events_ytd: {
				Args: {
					year: number;
				};
				Returns: {
					month: number;
					totaladults: number;
					totalchildren: number;
				}[];
			};
			aggregate_community_events: {
				Args: Record<PropertyKey, never>;
				Returns: {
					year: number;
					month: number;
					totaladults: number;
					totalchildren: number;
					totalfoodpounds: number;
				}[];
			};
			aggregate_community_events_ytd: {
				Args: {
					year: number;
				};
				Returns: {
					month: number;
					totaladults: number;
					totalchildren: number;
					totalfoodpounds: number;
				}[];
			};
			install_available_extensions_and_test: {
				Args: Record<PropertyKey, never>;
				Returns: boolean;
			};
			is_admin: {
				Args: {
					user_id: string;
				};
				Returns: boolean;
			};
		};
		Enums: {
			[_ in never]: never;
		};
		CompositeTypes: {
			[_ in never]: never;
		};
	};
}
