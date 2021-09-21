count=1

for entry in `ls | grep \.png`; do
	echo "entry=${entry}"
	if [ $entry == "test.sh" ]; then
		echo "excetion"
		continue
	fi

	DIGITS=`echo $entry | grep --perl-regexp '\(\d+\)' --only-matching`
	DIGITS=${DIGITS:1:-1}
	SUFFIX=`printf %05d $DIGITS`
	OLD_FILE=$entry
	NEW_FILE="CAhooper${SUFFIX}.png"

    mv $OLD_FILE $NEW_FILE
done

count=1

for entry in `ls | grep \.json`; do
	echo "entry=${entry}"
	if [ $entry == "test.sh" ]; then
		echo "excetion"
		continue
	fi

	DIGITS=`echo $entry | grep --perl-regexp '\(\d+\)' --only-matching`
	DIGITS=${DIGITS:1:-1}
	SUFFIX=`printf %05d $DIGITS`
	OLD_FILE=$entry
	NEW_FILE="CAhooper${SUFFIX}.json"

    mv $OLD_FILE $NEW_FILE
    
    JSON=".json"
    PNG=".png"

    NAME=${NEW_FILE%"$JSON"}
    PNG_NAME=$NAME$PNG
    IMAGE=$1$PNG_NAME

    jq -r --arg IMAGE "$IMAGE" '.image = $IMAGE' "$NEW_FILE" > temp && mv temp "$NEW_FILE"

    jq -r --argjson EDITION $(($DIGITS)) '.edition = $EDITION' "$NEW_FILE" > temp && mv temp "$NEW_FILE"

   	jq -r --arg name "$NAME" '.name = $name' "$NEW_FILE" > temp && mv temp "$NEW_FILE"

    (( count=count+1 ))
done