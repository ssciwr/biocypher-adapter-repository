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
}

interface DeduplicationResult {
    adapterA: string
    adapterB: string
    duplicationRate: number
    lastCalculated: Date
    crowdsourced: boolean
}

// Mock data for development - replace with actual MongoDB calls
const mockAdapters: Adapter[] = [
    {
        id: 'omnipath-secondary-adapter',
        name: 'OmniPath Secondary Adapter',
        description: 'BioCypher adapter for OmniPath secondary datasets including enzyme-substrate relationships, protein complexes, and regulatory interactions.',
        author: 'BioCypher Team',
        domain: 'proteomics',
        version: '1.0.0',
        tags: ['omnipath', 'proteomics', 'interactions', 'enzyme-substrate'],
        githubUrl: 'https://github.com/biocypher/omnipath-secondary-adapter',
        downloads: 15420
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

// Mock deduplication results
const mockDeduplicationResults: DeduplicationResult[] = [
    {
        adapterA: 'example-adapter',
        adapterB: 'genome-adapter',
        duplicationRate: 45.3,
        lastCalculated: new Date('2024-01-15'),
        crowdsourced: true
    },
    {
        adapterA: 'genome-adapter',
        adapterB: 'protein-adapter',
        duplicationRate: 12.7,
        lastCalculated: new Date('2024-01-10'),
        crowdsourced: true
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

export const getDeduplicationResult = async (adapterA: string, adapterB: string): Promise<DeduplicationResult | null> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 200))
    
    return mockDeduplicationResults.find(result => 
        (result.adapterA === adapterA && result.adapterB === adapterB) ||
        (result.adapterA === adapterB && result.adapterB === adapterA)
    ) || null
}

export const submitDeduplicationResult = async (
    adapterA: string, 
    adapterB: string, 
    duplicationRate: number
): Promise<boolean> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500))
    
    // In production, this would save to MongoDB
    const newResult: DeduplicationResult = {
        adapterA,
        adapterB,
        duplicationRate,
        lastCalculated: new Date(),
        crowdsourced: true
    }
    
    // Add to mock data (in production, save to database)
    mockDeduplicationResults.push(newResult)
    
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
    
    getDeduplicationFromDB: async (adapterA: string, adapterB: string) => {
        // This would query the deduplication collection
        // const collection = db.collection('deduplications')
        // return await collection.findOne({ 
        //     $or: [
        //         { adapterA, adapterB },
        //         { adapterA: adapterB, adapterB: adapterA }
        //     ]
        // })
        
        return getDeduplicationResult(adapterA, adapterB)
    }
}

export type { Adapter, DeduplicationResult }