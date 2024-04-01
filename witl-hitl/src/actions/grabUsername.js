'use server';
export default async function grabUsername(formData){
    const username =formData.get('username');
    console.log(username);
}