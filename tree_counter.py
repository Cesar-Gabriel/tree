# tree_counter.py

import json

class TreeCounter:
    def __init__(self):
        self.data = {}

    def add_tree(self, company_name, trees_count):
        if company_name in self.data:
            self.data[company_name] += trees_count
        else:
            self.data[company_name] = trees_count

    def get_total_trees(self):
        return sum(self.data.values())

    def save_data(self, filename="tree_data.json"):
        with open(filename, 'w') as f:
            json.dump(self.data, f)

    def load_data(self, filename="tree_data.json"):
        try:
            with open(filename, 'r') as f:
                self.data = json.load(f)
        except FileNotFoundError:
            self.data = {}

# Example usage
if __name__ == "__main__":
    counter = TreeCounter()
    counter.load_data()

    # Add trees planted by companies
    counter.add_tree("Company A", 100)
    counter.add_tree("Company B", 150)
    counter.add_tree("Company A", 50)

    # Save the data
    counter.save_data()

    # Print the total number of trees planted
    print("Total trees planted:", counter.get_total_trees())
