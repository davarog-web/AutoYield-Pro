export default async function handler(req, res) {
    // Only allow POST requests so we can securely receive the API key in the body
    if (req.method !== 'POST') return res.status(405).json({ error: 'Method Not Allowed' });

    const { tenant, key, reagentName } = req.body;

    try {
        // The secure server-to-server request to Benchling
        const benchlingRes = await fetch(`https://${tenant}/api/v2/inventory-items?name=${encodeURIComponent(reagentName)}`, {
            method: 'GET',
            headers: {
                'Authorization': 'Basic ' + Buffer.from(key + ':').toString('base64'),
                'Accept': 'application/json'
            }
        });

        if (!benchlingRes.ok) throw new Error(`Benchling rejected the request: ${benchlingRes.status}`);
        
        const data = await benchlingRes.json();
        return res.status(200).json(data);

    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}
