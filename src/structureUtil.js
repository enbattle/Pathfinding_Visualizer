// Data structure with last-in-first-out (LIFO) policy
// Top of Stack is at the end
export class Stack {
    constructor() {
        this.list = [];
    }

    // Based on last-in-first-out (LIFO), items are pushed in front of the stack
    push(item) {
        this.list.unshift(item);
    }
    
    // Pop the top of the stack
    pop() {
        if (this.isEmpty()) {
            return "Stack is empty. Unable to pop.";
        }
        return this.list.shift();
    }

    // Peek at the top of the stack
    peek() {
        if (this.isEmpty()) {
            return "Stack is empty. Unable to peek.";
        }
        return this.list[0];
    }

    // Check if stack is empty
    isEmpty() {
        return this.list.length === 0;
    }

    // Print the stack (debugging purposes)
    print() {
        for (let i=0; i<this.list.length; i++) {
            console.log(this.list[i]);
        }
    }
}

// Data structure with first-in-first-out (FIFO) policy
// Top of Queue is at the end
export class Queue {
    constructor() {
        this.list = [];
    }

    // Based on first-in-first-out (FIFO), items are pushed to the back of the queue
    push(item) {
        this.list.push(item);
    }

    // Pop the front of the queue
    pop() {
        if (this.isEmpty()) {
            return "Queue is empty. Unable to pop.";
        }
        return this.list.shift();
    }

    // Peek at the front of the queue
    peek() {
        if (this.isEmpty()) {
            return "Queue is empty. Unable to peek.";
        }
        return this.list[0];
    }

    // Check if queue is empty
    isEmpty() {
        return this.list.length === 0;
    }

    // Print the queue (debugging purposes)
    print() {
        for (let i=0; i<this.list.length; i++) {
            console.log(this.list[i]);
        }
    }
}

// Class to creat an item and have a priority associated with it
class PriorityItem {
    constructor(item, priority) {
        this.item = item
        this.priority = priority
    }
}

/* Data structure where the policy corresponds to the priority associated with 
   each item in the queue. Utilizes the lower priority item first (ascending order)
   (i.e shortest path algorithm, etc).
*/
export class PriorityQueueAscend {
    constructor() {
        this.list = [];
        this.comparator = function(itemA, itemB) {
            return parseFloat(itemA.priority) - parseFloat(itemB.priority);
        };
    }

    // Push item into the priority queue, and sort it based on the comparator
    push(item, priority) {
        var newItem = new PriorityItem(item, priority);
        this.list.push(newItem);

        // Sort using a comparator
        this.list.sort(this.comparator);
    }

    // Pop the top of the priority queue
    pop() {
        if (this.isEmpty()) {
            return "Priority Queue is empty. Unable to pop.";
        }
        return this.list.shift();
    }

    // Peek at the top of the priority queue (lowest priority item)
    peek() {
        if (this.isEmpty()) {
            return "Priority Queue is empty. Unable to peek.";
        }
        return this.list[0];
    }

    // Check if priority queue is empty
    isEmpty() {
        return this.list.length === 0;
    }

    // Print the priority queue (debugging purposes)
    print() {
        for (let i=0; i<this.list.length; i++) {
            console.log(this.list[i].priority);
        }
    }
}

/* Data structure where the policy corresponds to the priority associated with 
   each item in the queue. Utilizes the higher priority item first (descending order) 
   (market-highs, etc).
*/

export class PriorityQueueDescend {
    constructor() {
        this.list = [];
        this.comparator = function(itemA, itemB) {
            return parseFloat(itemB.priority) - parseFloat(itemA.priority);
        };
    }

    // Push item into the priority, and then sort using the comparator
    push(item, priority) {
        var newItem = new PriorityItem(item, priority);
        this.list.push(newItem);

        // Sort using a comparator
        this.list.sort(this.comparator);
    }

    // Pop the top of the priority queue (highest priority item)
    pop() {
        if (this.isEmpty()) {
            return "Priority Queue is empty. Unable to pop.";
        }
        return this.list.shift();
    }

    // Peek at the top of the priority queue
    peek() {
        if (this.isEmpty()) {
            return "Priority Queue is empty. Unable to peek.";
        }
        return this.list[0];
    }

    // Check if priority queue is empty
    isEmpty() {
        return this.list.length === 0;
    }

    // Print the priority queue (debugging purposes)
    print() {
        for (let i=0; i<this.list.length; i++) {
            console.log(this.list[i].priority);
        }
    }
}