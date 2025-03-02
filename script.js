// 魔法データを取得して検索・認証
async function searchMagic() {
    try {
        const magicName = document.getElementById("magicName").value.trim();
        const response = await fetch("magic.json");

        if (!response.ok) {
            throw new Error(`HTTPエラー: ${response.status}`);
        }

        const data = await response.json();
        const magic = data.magic.find(m => m.name === magicName);

        const resultDiv = document.getElementById("magicResult");
        resultDiv.innerHTML = ""; // 結果をリセット

        if (!magic) {
            resultDiv.innerHTML = "<p>その名前の魔法は存在しません</p>";
            return;
        }

        // 概要の表示
        resultDiv.innerHTML = `
            <h3>${magic.name}</h3>
            <p>${magic.description}</p>
            <input type="password" id="magicPassword" placeholder="パスワードを入力">
            <button onclick="unlockMagic('${magicName}')">詳細を見る</button>
            <div id="magicDetails"></div>
        `;

    } catch (error) {
        console.error("エラー:", error);
        alert("データ取得中に問題が発生しました");
    }
}

// 詳細の認証
async function unlockMagic(magicName) {
    try {
        const response = await fetch("magic.json");
        if (!response.ok) {
            throw new Error(`HTTPエラー: ${response.status}`);
        }

        const data = await response.json();
        const magic = data.magic.find(m => m.name === magicName);

        if (!magic) {
            document.getElementById("magicDetails").innerHTML = "<p>魔法が見つかりません</p>";
            return;
        }

        const enteredPassword = document.getElementById("magicPassword").value;
        if (enteredPassword === magic.password) {
            document.getElementById("magicDetails").innerHTML = `<p><strong>詳細:</strong> ${magic.details}</p>`;
        } else {
            document.getElementById("magicDetails").innerHTML = "<p style='color:red;'>パスワードが違います</p>";
        }

    } catch (error) {
        console.error("エラー:", error);
        alert("詳細取得中に問題が発生しました");
    }
}
