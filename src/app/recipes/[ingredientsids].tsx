import { FlatList, Text, View } from "react-native-reanimated/lib/typescript/Animated";
import { styles } from "./styles";
import { MaterialIcons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { Recipe } from "@/components/Recipe";
import { useEffect, useState } from "react";
import { services } from "@/services";
import { Ingredients } from "@/components/Ingredients";

export default function Recipes() {

    const [ingredients, setIngredients] = useState<IngredientResponse[]>([])

    const [recipes, setRecipes] = useState<RecipeResponse[]>([])

    const params = useLocalSearchParams<{ igredientsIds: string }>()

    const IngredientesIds = params.igredientsIds.split(",")

    useEffect(() => {
        services.ingredients.findByIds(IngredientesIds).then(setIngredients)
    }, [])

    useEffect(() => {
        services.recipes.findByIngredientsIds(IngredientesIds
        ).then(setRecipes)
    }, [])

    return <View style={styles.container}>
        <View style={styles.header}>
            <MaterialIcons name="arrow-back" size={32} onPress={() => router.back()} />

            <Text style={styles.title}>Ingredientes</Text>

        </View>

        <Ingredients ingredients={ingredients} />

        <FlatList
            data={recipes}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
                <Recipe
                    recipe={item}
                    onPress={() => router.navigate("/recipe/" + item.id)}
                />
            )}
            style={styles.recipes}
            contentContainerStyle={styles.recipesContent}
            showsHorizontalScrollIndicator={false}
            columnWrapperStyle={{ gap: 16 }}
            numColumns={2}
        />
    </View>
}