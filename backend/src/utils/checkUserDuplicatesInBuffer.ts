export type BufferUserData = {
    names: string[];
    documents: string[];
};
export function checkUserDuplicatesInBuffer(userArray: BufferUserData[]): BufferUserData[] {
    const nameToDocumentMap: Map<string, string> = new Map();

    userArray.forEach(user => {
        user.names.forEach((name, index) => {
            if (!nameToDocumentMap.has(name)) {
                nameToDocumentMap.set(name, user.documents[index]);
            }
        });
    });

    const uniqueUsers: BufferUserData[] = Array.from(nameToDocumentMap.entries()).map(([name, document]) => ({
        names: [name],
        documents: [document],
    }));

    return uniqueUsers;
}