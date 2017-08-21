export class User {
	constructor(
		public id: number,
		public name: string,
		public email: string,
		public info: Info,
		public posts: Posts,
		public created_at: Date,
		public updated_at: Date,)
		{}
};

export class Info {
	constructor(
		public id:number,
		public user_id:number,
		public first_name:string,
		public last_name:string,
		public avatar:string,
		public first_login:boolean,
		public about:string,
		public country:string,
		public created_at: Date,
		public updated_at: Date,
	){}
}

export class Posts {
	constructor(
		public id:number,
		public description:string,
		public likes:any,
		public picture_url:string,
		public updated_at: Date,
		public created_at: Date,
	){}
}