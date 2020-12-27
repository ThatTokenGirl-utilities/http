export default {
    matches: 'application/json',
    formatter: (body: any) => {
        return JSON.stringify(body);
    }
}