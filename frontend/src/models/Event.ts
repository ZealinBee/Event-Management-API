export default interface Event {
    id: string;
    title: string;
    description: string;
    location: string;
    date: string;
    organizerId: string;
    attendees: string[];
}