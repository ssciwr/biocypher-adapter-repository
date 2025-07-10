// MongoDB initialization script
db = db.getSiblingDB('biocypher-adapters');

// Create collections
db.createCollection('adapters');

// Insert sample adapter data
db.adapters.insertMany([
    {
        _id: 'open-targets',
        name: 'Open Targets Adapter',
        description: 'BioCypher adapter for Open Targets database providing comprehensive target-disease associations, drug information, and evidence data.',
        author: 'BioCypher Team',
        domain: 'genetics',
        version: '1.2.0',
        tags: ['open-targets', 'drug-discovery', 'genetics', 'target-disease'],
        githubUrl: 'https://github.com/biocypher/open-targets',
        downloads: 28500,
        createdAt: new Date(),
        lastUpdated: new Date()
    },
    {
        _id: 'example-adapter',
        name: 'ExampleAdapter',
        description: 'This adapter provides seamless integration with ExampleDB, enabling efficient data transformation and loading for bioinformatics workflows.',
        author: 'BioCypher Team',
        domain: 'genomics',
        version: '2.2.2',
        tags: ['database', 'genomics', 'data-transformation'],
        githubUrl: 'https://github.com/biocypher/biocypher-adapter-example',
        downloads: 222222,
        createdAt: new Date(),
        lastUpdated: new Date()
    },
    {
        _id: 'genome-adapter',
        name: 'GenomeAdapter',
        description: 'Advanced genome data processing adapter with support for multiple file formats and reference genomes.',
        author: 'Genomics Lab',
        domain: 'genomics',
        version: '1.5.0',
        tags: ['genome', 'fasta', 'reference'],
        githubUrl: 'https://github.com/biocypher/genome-adapter',
        downloads: 145000,
        createdAt: new Date(),
        lastUpdated: new Date()
    },
    {
        _id: 'protein-adapter',
        name: 'ProteinAdapter',
        description: 'Protein structure and sequence analysis adapter for structural bioinformatics applications.',
        author: 'Protein Research Group',
        domain: 'proteomics',
        version: '3.1.1',
        tags: ['protein', 'structure', 'pdb'],
        githubUrl: 'https://github.com/biocypher/protein-adapter',
        downloads: 98500,
        createdAt: new Date(),
        lastUpdated: new Date()
    },
    {
        _id: 'rna-seq-adapter',
        name: 'RNASeqAdapter',
        description: 'RNA sequencing data processing adapter with differential expression analysis capabilities.',
        author: 'Transcriptomics Team',
        domain: 'transcriptomics',
        version: '2.0.3',
        tags: ['rna-seq', 'expression', 'differential'],
        githubUrl: 'https://github.com/biocypher/rnaseq-adapter',
        downloads: 76300,
        createdAt: new Date(),
        lastUpdated: new Date()
    },
    {
        _id: 'metabolomics-adapter',
        name: 'MetabolomicsAdapter',
        description: 'Metabolomics data processing and analysis adapter with support for mass spectrometry data.',
        author: 'Metabolomics Core',
        domain: 'metabolomics',
        version: '1.2.0',
        tags: ['metabolomics', 'mass-spec', 'analysis'],
        githubUrl: 'https://github.com/biocypher/metabolomics-adapter',
        downloads: 54200,
        createdAt: new Date(),
        lastUpdated: new Date()
    },
    {
        _id: 'microbiome-adapter',
        name: 'MicrobiomeAdapter',
        description: 'Microbiome analysis adapter for 16S rRNA and metagenomic data processing.',
        author: 'Microbiome Research Lab',
        domain: 'microgenomics',
        version: '2.1.0',
        tags: ['microbiome', '16s', 'metagenomics'],
        githubUrl: 'https://github.com/biocypher/microbiome-adapter',
        downloads: 67800,
        createdAt: new Date(),
        lastUpdated: new Date()
    }
]);


// Create indexes for better search performance
db.adapters.createIndex({ name: "text", description: "text", tags: "text", author: "text" });
db.adapters.createIndex({ domain: 1 });
db.adapters.createIndex({ downloads: -1 });
db.adapters.createIndex({ lastUpdated: -1 });


print('MongoDB initialization completed successfully!');
