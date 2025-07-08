import { makeAutoObservable } from 'mobx'
import React, { createContext, useContext } from 'react'

interface OverlapData {
    [key: string]: number
}

class AdapterStore {
    selectedAdapters: string[] = []
    overlapData: OverlapData = {}

    constructor() {
        makeAutoObservable(this)
        // Simulate fetching crowdsourced data
        this.fetchOverlapData()
    }

    addSelectedAdapter(adapterId: string) {
        if (!this.selectedAdapters.includes(adapterId)) {
            this.selectedAdapters.push(adapterId)
        }
    }

    removeSelectedAdapter(adapterId: string) {
        this.selectedAdapters = this.selectedAdapters.filter(id => id !== adapterId)
    }

    generateCLICommand(): string {
        if (this.selectedAdapters.length < 2) {
            return 'biocypher overlap --adapters <adapter1> <adapter2>'
        }

        const adaptersList = this.selectedAdapters.join(' ')
        return `biocypher overlap --adapters ${adaptersList} --output json`
    }

    async fetchOverlapData() {
        // Simulate API call to get crowdsourced data
        // In real implementation, this would call your Docker database
        try {
            // Mock delay
            await new Promise(resolve => setTimeout(resolve, 1000))

            // Mock data - only some adapters have crowdsourced data
            const mockData: OverlapData = {
                'ExampleAdapter': 45.3,
                'GenomeAdapter': 62.7,
                // Other adapters won't have data
            }

            this.overlapData = mockData
        } catch (error) {
            console.error('Failed to fetch overlap data:', error)
        }
    }

    calculateOverlap(adapter1: string, adapter2: string): number | null {
        const key = `${adapter1}-${adapter2}`
        return this.overlapData[key] || null
    }
}

const AdapterStoreContext = createContext<AdapterStore | null>(null)

// Create a single instance of the store
const adapterStore = new AdapterStore()

export const AdapterStoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <AdapterStoreContext.Provider value={adapterStore}>
            {children}
        </AdapterStoreContext.Provider>
    )
}

export const useAdapterStore = () => {
    const store = useContext(AdapterStoreContext)
    if (!store) {
        throw new Error('useAdapterStore must be used within AdapterStoreProvider')
    }
    return store
}