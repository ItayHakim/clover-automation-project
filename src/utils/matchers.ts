import { expect as baseExpect } from "@playwright/test";

export const expect = baseExpect.extend({
    toBeSorted(received: readonly string[] | readonly number[], direction: "asc" | "desc" = "asc") {
        const expected = [...received].sort((first, second) => {
            if (first < second) return -1;
            if (first > second) return 1;
            return 0;
        });
        if (direction === "desc") {
            expected.reverse();
        }

        return {
            pass: received.every((value, index) => value === expected[index]),
            message: () => [
                `Expected values ${this.isNot ? "not " : ""}to be sorted ${direction}.`,
                `Received: ${this.utils.printReceived(received)}`,
                `Sorted: ${this.utils.printExpected(expected)}`,
            ].join("\n"),
        };
    },
});
