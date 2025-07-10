// Adapter service for MongoDB operations
interface AdapterDetails {
    componentType: string
    adapterGranularity: string
    adapterInputFormat: string
    resourceType: string
    resourceUrl: string
    adapterUrl: string
    dataType: string
    assignee?: string
}

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
    details?: AdapterDetails
}


// Available options for adapter details
export const ADAPTER_OPTIONS = {
    componentType: ['Input'],
    adapterGranularity: ['Primary', 'Secondary'],
    adapterInputFormat: ['Flat file', 'API', 'Parquet', 'not mentioned'],
    resourceType: ['Database'],
    resourceUrl: ['missing', 'Y', 'broken', 'not created'],
    adapterUrl: ['alinks/blob/main/me', 'broken', 'Y', 'not created'],
    dataType: ['Metabolomics', 'Proteomics', 'Gene Expression', 'Genetics', 'Clinical', 'Not mentioned', 'Molecular interaction'],
    assignees: ['EliasParr', 'shengchd', 'mingjiecn', 'ottojolanki', 'slobentanzer', 'kpto', 'bnymnsen', 'pedrohr', 'vincentvialard', 'ecarrenolozano', 'AndiMajore', 'Maiykol']
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
        downloads: 28500,
        details: {
            componentType: 'Input',
            adapterGranularity: 'Primary',
            adapterInputFormat: 'API',
            resourceType: 'Database',
            resourceUrl: 'Y',
            adapterUrl: 'https://github.com/biocypher/open-targets',
            dataType: 'Genetics',
            assignee: 'slobentanzer'
        }
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
        downloads: 222222,
        details: {
            componentType: 'Input',
            adapterGranularity: 'Secondary',
            adapterInputFormat: 'Flat file',
            resourceType: 'Database',
            resourceUrl: 'missing',
            adapterUrl: 'https://github.com/biocypher/biocypher-adapter-example',
            dataType: 'Gene Expression',
            assignee: 'EliasParr'
        }
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
        downloads: 145000,
        details: {
            componentType: 'Input',
            adapterGranularity: 'Primary',
            adapterInputFormat: 'Parquet',
            resourceType: 'Database',
            resourceUrl: 'Y',
            adapterUrl: 'https://github.com/biocypher/genome-adapter',
            dataType: 'Genetics',
            assignee: 'mingjiecn'
        }
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
        downloads: 98500,
        details: {
            componentType: 'Input',
            adapterGranularity: 'Primary',
            adapterInputFormat: 'API',
            resourceType: 'Database',
            resourceUrl: 'Y',
            adapterUrl: 'https://github.com/biocypher/protein-adapter',
            dataType: 'Proteomics',
            assignee: 'ottojolanki'
        }
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
        downloads: 76300,
        details: {
            componentType: 'Input',
            adapterGranularity: 'Secondary',
            adapterInputFormat: 'Flat file',
            resourceType: 'Database',
            resourceUrl: 'broken',
            adapterUrl: 'https://github.com/biocypher/rnaseq-adapter',
            dataType: 'Gene Expression',
            assignee: 'shengchd'
        }
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

export const getAdapterDetails = async (adapterId: string): Promise<AdapterDetails | null> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300))

    const adapter = mockAdapters.find(a => a.id === adapterId)
    return adapter?.details || null
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

export type { Adapter, AdapterDetails }
