// Adapter service for MongoDB operations
interface Adapter {
    id: string
    name: string
    description: string
    author: string
    domain: string
    version: string
    tags: string[]
    githubUrl?: string
    downloads?: number
    lastUpdated?: Date
    metadata?: any
    status?: 'published' | 'draft' | 'pending'
    submittedAt?: Date
    croissantFile?: File
    croissantUrl?: string
}


// Mock data for development - replace with actual MongoDB calls
const mockAdapters: Adapter[] = [
    {
        id: 'open-targets',
        name: 'Open Targets Adapter',
        description: 'BioCypher adapter for Open Targets database providing comprehensive target-disease associations, drug information, and evidence data.',
        author: 'BioCypher Team',
        domain: 'genetics',
        version: '1.2.0',
        tags: ['open-targets', 'drug-discovery', 'genetics', 'target-disease'],
        githubUrl: 'https://github.com/biocypher/open-targets',
        downloads: 28500
    },
    {
        id: 'example-adapter',
        name: 'ExampleAdapter',
        description: 'This adapter provides seamless integration with ExampleDB, enabling efficient data transformation and loading for bioinformatics workflows.',
        author: 'BioCypher Team',
        domain: 'genomics',
        version: '2.2.2',
        tags: ['database', 'genomics', 'data-transformation'],
        githubUrl: 'https://github.com/biocypher/biocypher-adapter-example',
        downloads: 222222
    },
    {
        id: 'genome-adapter',
        name: 'GenomeAdapter',
        description: 'Advanced genome data processing adapter with support for multiple file formats and reference genomes.',
        author: 'Genomics Lab',
        domain: 'genomics',
        version: '1.5.0',
        tags: ['genome', 'fasta', 'reference'],
        githubUrl: 'https://github.com/biocypher/genome-adapter',
        downloads: 145000
    },
    {
        id: 'protein-adapter',
        name: 'ProteinAdapter',
        description: 'Protein structure and sequence analysis adapter for structural bioinformatics applications.',
        author: 'Protein Research Group',
        domain: 'proteomics',
        version: '3.1.1',
        tags: ['protein', 'structure', 'pdb'],
        githubUrl: 'https://github.com/biocypher/protein-adapter',
        downloads: 98500
    },
    {
        id: 'rna-seq-adapter',
        name: 'RNASeqAdapter',
        description: 'RNA sequencing data processing adapter with differential expression analysis capabilities.',
        author: 'Transcriptomics Team',
        domain: 'transcriptomics',
        version: '2.0.3',
        tags: ['rna-seq', 'expression', 'differential'],
        githubUrl: 'https://github.com/biocypher/rnaseq-adapter',
        downloads: 76300
    }
]


// API functions - these would connect to MongoDB in production
export const searchAdapters = async (query: string): Promise<Adapter[]> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500))
    
    const lowercaseQuery = query.toLowerCase()
    
    return mockAdapters.filter(adapter => 
        adapter.name.toLowerCase().includes(lowercaseQuery) ||
        adapter.description.toLowerCase().includes(lowercaseQuery) ||
        adapter.author.toLowerCase().includes(lowercaseQuery) ||
        adapter.domain.toLowerCase().includes(lowercaseQuery) ||
        adapter.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery))
    )
}

export const getAdapterById = async (id: string): Promise<Adapter | null> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 200))
    
    return mockAdapters.find(adapter => adapter.id === id) || null
}

export const getAllAdapters = async (): Promise<Adapter[]> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300))
    
    return mockAdapters
}

export const registerAdapter = async (adapterData: {
    name: string
    githubUrl: string
    author: string
    croissantFile?: File | null
    croissantUrl?: string | null
}): Promise<boolean> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // In production, this would save to MongoDB with draft status
    const newAdapter: Adapter = {
        id: `draft-${Date.now()}`,
        name: adapterData.name,
        description: 'Draft adapter pending review',
        author: adapterData.author,
        domain: 'unknown',
        version: '0.0.1',
        tags: ['draft'],
        githubUrl: adapterData.githubUrl,
        downloads: 0,
        status: 'draft',
        submittedAt: new Date(),
        croissantFile: adapterData.croissantFile,
        croissantUrl: adapterData.croissantUrl,
        lastUpdated: new Date()
    }
    
    // Add to mock data (in production, save to database)
    mockAdapters.push(newAdapter)
    
    return true
}



// Server action functions that would run on the backend
export const serverActions = {
    // These would be actual server actions in a full-stack setup
    searchAdaptersFromDB: async (query: string) => {
        // This would connect to MongoDB Docker container
        // Example: const client = new MongoClient(process.env.MONGODB_URL)
        // const db = client.db('biocypher-adapters')
        // const collection = db.collection('adapters')
        // return await collection.find({ $text: { $search: query } }).toArray()
        
        return searchAdapters(query)
    },
    
}

export type { Adapter }