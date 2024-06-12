import { createEffect, createSignal } from "solid-js";
import { SolidFlow } from "solid-flow";
import { NodeProps } from "solid-flow/dist/components";

const initialNodes: NodeProps[] = [
    {
        id: "node-1",
        position: { x: 50, y: 100 },
        data: {
            label: 'CEO',
            content: (
                <div class="flex flex-col gap-3 min-w-[80px]">
                    <button data-dropdown-toggle="dropdown" class="hover:text-white text-gray-800 border border-gray-800  hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 text-xs rounded-md p-2 h-fit w-fit text-center mr-2 mb-2 " type="button">
                        <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 4 15">
                            <path d="M3.5 1.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 6.041a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 5.959a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z" />
                        </svg>
                    </button>
                    <div id="dropdown" class="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
                        <ul class="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="multiLevelDropdownButton">
                            <li>
                                <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Dashboard</a>
                            </li>
                        </ul>
                    </div>
                </div>
            ),
        },
        inputs: 0,
        outputs: 1,
    },
    {
        id: "node-2",
        position: { x: 350, y: 100 },
        data: {
            label: "Manager 1",
            content: <p>Manager 1</p>,
        },
        inputs: 1,
        outputs: 0,
    },
];

const initialEdges = [
    {
        id: "edge_node-1:0_node-2:0",
        sourceNode: "node-1",
        sourceOutput: 0,
        targetNode: "node-2",
        targetInput: 0,
    }
];

const FlowDesignPage = () => {
    const [nodes, setNodes] = createSignal(initialNodes);
    const [edges, setEdges] = createSignal(initialEdges);

    return (
        <div>
            <SolidFlow
                nodes={nodes()}
                edges={edges()}
                onNodesChange={setNodes}
                onEdgesChange={setEdges}
            />
        </div>
    )
}

export default FlowDesignPage;