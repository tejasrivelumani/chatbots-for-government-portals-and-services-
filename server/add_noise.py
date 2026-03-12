import pandas as pd
import random

# Load your original dataset
df = pd.read_excel(r"C:\Users\TEJASRI\Downloads\Government_Chatbot_Multilingual_Intent_Dataset_v2.xlsx")

# Some random noise words
noise_words = ["pls", "urgent", "sir", "govt", "hello", "asap", "??", "!!!", "kindly"]

# Function to introduce spelling mistakes
def add_spelling_noise(text):
    words = text.split()
    if len(words) > 2:
        idx = random.randint(0, len(words)-1)
        word = words[idx]
        if len(word) > 3:
            word = word[:-1]  # remove last character
            words[idx] = word
    return " ".join(words)

# Function to add random noise word
def add_random_word(text):
    if random.random() < 0.4:
        text += " " + random.choice(noise_words)
    return text

# Apply noise to text
df["text"] = df["text"].apply(add_spelling_noise)
df["text"] = df["text"].apply(add_random_word)

# Flip 15% labels randomly
intents = df["intent"].unique()
flip_indices = df.sample(frac=0.15).index

for idx in flip_indices:
    current_intent = df.loc[idx, "intent"]
    possible_intents = [i for i in intents if i != current_intent]
    df.loc[idx, "intent"] = random.choice(possible_intents)

# Shuffle dataset
df = df.sample(frac=1).reset_index(drop=True)

# Save noisy dataset
df.to_excel("Government_Chatbot_FULLY_Noisy_Dataset.xlsx", index=False)

print("Noisy dataset created successfully!")